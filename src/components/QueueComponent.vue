<template>
  <div class="queue">
    <b-button-group class="float-right mb-2">
      <b-button @click="clearJobs">Clear All</b-button>
    </b-button-group>

    <b-table
      striped
      hover
      dark
      :fields="fields"
      :items="items"
      v-model:sort-by="sortBy"
      v-model:sort-desc="sortDesc"
    >
      <template v-slot:cell(status)="data">
        <b-badge
          :variant="['error', 'cancelled'].includes(data.item.status) ? 'danger' : 'primary'"
          >{{ data.item.status }}</b-badge
        >
      </template>

      <template v-slot:cell(progress)="data">
        <b-progress
          v-if="data.item.status === 'encoding'"
          :value="percent"
          :animated="percent !== 100"
          :variant="percent === 100 ? 'success' : 'primary'"
          show-progress
        ></b-progress>
        <p
          class="text-monospace text-center"
          style="font-size: 0.7em; margin: 0"
          v-if="speed && fps && data.item.status === 'encoding'"
        >
          {{ speed }} @ {{ fps }} FPS
        </p>
      </template>

      <template v-slot:cell(details)="row">
        <b-button size="sm" @click="toggleDetails(row.item.id, row.item._showDetails)" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show' }}
        </b-button>
      </template>

      <template v-slot:cell(action)="data">
        <b-button-group size="sm">
          <b-button
            variant="light"
            v-if="!['error', 'cancelled', 'completed'].includes(data.item.status)"
            @click="onClickCancel(data.item.id)"
            >❌</b-button
          >
          <b-button
            variant="light"
            v-if="['error', 'cancelled'].includes(data.item.status)"
            @click="onClickRestart(data.item.id)"
            >&#10227;</b-button
          >
        </b-button-group>
      </template>

      <template v-slot:row-details="row">
        <b-row class="mb-2">
          <b-col sm="2" class="text-sm-right"><b>Input:</b></b-col>
          <b-col>{{ row.item.input }}</b-col>
        </b-row>

        <b-row class="mb-2">
          <b-col sm="2" class="text-sm-right"><b>Output:</b></b-col>
          <b-col>
            <a :href="videoUrl(row.item.output)" target="_blank">{{ row.item.output }}</a>
          </b-col>
        </b-row>

        <b-row class="mb-2">
          <b-col sm="2" class="text-sm-right"><b>Payload:</b></b-col>
          <b-col>
            <b-form-textarea
              class="code"
              rows="6"
              size="sm"
              readonly
              :value="JSON.stringify(row.item.payload, null, 2)"
            ></b-form-textarea>
          </b-col>
        </b-row>

        <b-row class="mb-2" v-if="row.item.status === 'completed'">
          <b-col sm="2" class="text-sm-right"><b>Preview:</b></b-col>
          <b-col>
            <video :src="videoUrl(row.item.output)" width="70%" controls muted />
          </b-col>
        </b-row>

        <!-- Display error if recieved from message -->
        <b-row class="mb-2" v-if="row.item.error">
          <b-col sm="2" class="text-sm-right"><b>Error:</b></b-col>
          <b-col>
            <div class="code">
              <b-form-textarea
                rows="3"
                max-rows="3"
                :value="JSON.stringify(row.item.error)"
              ></b-form-textarea>
            </div>
          </b-col>
        </b-row>
      </template>
    </b-table>
    <h2 class="text-center" v-if="items.length === 0">No Jobs in Queue</h2>
  </div>
</template>

<script setup lang="ts">
import storage from '../libs/storage'
import useControlStore from '../stores/control'

const store = useControlStore()
const WS_INTERVAL = 5000
const DEFAULT_VIDEO_HOST = 'http://127.0.0.1:8080'
const Status = {
  QUEUED: 'queued',
  ENCODING: 'encoding',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  ERROR: 'error',
}

import { ref, onMounted } from 'vue'

interface Job {
  id: string
  input: string
  output: string
  status: string
  payload: any
  error?: any
  _showDetails?: boolean
}

interface Field {
  key: string
  sortable?: boolean
}

const percent = ref(0)
const speed = ref<string | null>(null)
const fps = ref(0)
const job = ref<Partial<Job>>({})
const items = ref<Job[]>([])
const fields = ref<Field[]>([
  { key: 'id', sortable: true },
  { key: 'input' },
  { key: 'output' },
  { key: 'status' },
  { key: 'progress' },
  { key: 'details' },
  { key: 'action' },
])
const sortBy = ref('id')
const sortDesc = ref(true)
const ws = ref<WebSocket | null>(null)

const initWS = () => {
  setInterval(() => {
    if (ws.value && ws.value.readyState === WebSocket.OPEN) {
      ws.value.onmessage = onWSMessage
      ws.value.onerror = onWSError
      startQueue()
    }
  }, WS_INTERVAL)
}

const onWSMessage = (event: MessageEvent) => {
  const data = JSON.parse(event.data)
  percent.value = data.percent
  speed.value = data.speed
  fps.value = data.fps
  const err = data.err

  if (percent.value === 100) {
    setJobStatus(job.value.id!, Status.COMPLETED)
    store.setIsEncoding(false)
  }

  if (err) {
    setJobStatus(job.value.id!, Status.ERROR)
    store.setIsEncoding(false)
    storage.setError('queue', job.value.id!, err)
  }
}

const onWSError = () => {
  if (job.value.status !== Status.COMPLETED) {
    setJobStatus(job.value.id!, Status.ERROR)
  }
  store.setIsEncoding(false)
}

const startQueue = () => {
  getQueue()

  setInterval(() => {
    getQueue()

    if (job.value.status && job.value.status === Status.ENCODING) {
      store.setIsEncoding(true)
      return
    }

    getNextJob()

    if (job.value.id) sendEncode()
  }, WS_INTERVAL)
}

const getQueue = () => {
  items.value = storage.getAll('queue')
}

const getNextJob = () => {
  const filtered = items.value.filter(
    (item) => item.status === Status.QUEUED || item.status === Status.ENCODING,
  )
  job.value = filtered[0] || {}
}

const sendEncode = () => {
  ws.value!.send(
    JSON.stringify({
      type: 'encode',
      input: job.value.input,
      output: job.value.output,
      payload: JSON.stringify(job.value.payload),
    }),
  )
  setJobStatus(job.value.id!, Status.ENCODING)
}

const setJobStatus = (id: string, status: string) => {
  job.value.status = status
  storage.updateStatus('queue', id, status)
  getQueue()
}

const clearJobs = () => {
  storage.deleteAll('queue')
  getQueue()
}

const onClickCancel = (id: string) => {
  setJobStatus(id, Status.CANCELLED)
}

const onClickRestart = (id: string) => {
  setJobStatus(id, Status.QUEUED)
}

const toggleDetails = (id: string, enabled: boolean) => {
  storage.toggleDetails('queue', id, !enabled)
  getQueue()
}

const videoUrl = (output: string) => {
  return `${DEFAULT_VIDEO_HOST}/${output}`
}

onMounted(() => {
  getQueue()
  initWS()
})
</script>

<style>
textarea.code {
  font-family: monospace;
}
</style>
