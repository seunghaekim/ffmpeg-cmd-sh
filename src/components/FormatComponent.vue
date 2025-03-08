<template>
  <div>
    <b-form-row>
      <b-col>
        <b-form-group label="Container:" label-for="container">
          <b-form-select class="u-full-width" v-model="formStore.format.container">
            <option :value="null" disabled>-- Please select an option --</option>
            <optgroup v-for="(o, i) in options.containers" :label="i.toString()" v-bind:key="i">
              <option v-for="item in o" :key="item.name" :value="item.value">
                {{ item.name }}
              </option>
            </optgroup>
          </b-form-select>
        </b-form-group>
      </b-col>

      <b-col>
        <b-form-group label="Clip:" label-for="clip">
          <b-form-select class="u-full-width" v-model="formStore.format.clip">
            <option :value="null" disabled>-- Please select an option --</option>
            <option v-for="o in options.clip" :key="o.name" :value="o.value">{{ o.name }}</option>
          </b-form-select>
        </b-form-group>
      </b-col>

      <b-col v-if="formStore.format.clip">
        <b-form-group
          label="Start Time:"
          label-for="start-time"
          :state="startTimeState"
          :invalidFeedback="invalidFeedback"
        >
          <b-form-input
            v-model="formStore.format.startTime"
            :state="startTimeState"
            placeholder="00:00:00.000"
          ></b-form-input>
        </b-form-group>
      </b-col>

      <b-col v-if="formStore.format.clip">
        <b-form-group
          label="Stop Time:"
          label-for="stop-time"
          :state="stopTimeState"
          :invalidFeedback="invalidFeedback"
        >
          <b-form-input
            v-model="formStore.format.stopTime"
            placeholder="00:00:00.000"
            :state="stopTimeState"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-form-row>
  </div>
</template>

<script setup lang="ts">
import options from '@/libs/options'
import useFormStore from '@/stores/form'
import { computed } from 'vue'

const formStore = useFormStore()

function timeState(value?: string | null) {
  if (value === '' || value === null) return null
  if (value?.match(/^(\d{2}:){2}\d{2}\.\d{3}$/)) return true
  return false
}

const stopTimeState = computed(() => {
  return timeState(formStore.format.stopTime)
})

const startTimeState = computed(() => {
  return timeState(formStore.format.startTime)
})

const invalidFeedback = 'Invalid time format. Please use 00:00:00.000'
</script>
