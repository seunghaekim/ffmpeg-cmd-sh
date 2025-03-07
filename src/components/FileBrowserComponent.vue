<template>
  <div id="file-browser">
    <div>
      <ul>
        <li class="cwd">{{ data.cwd }}</li>
        <li v-if="prefix !== ''">
          <a href="#" @click.prevent="goBack">...</a>
        </li>
        <li v-for="o in filteredFiles" v-bind:key="o.label">
          <a href="#" @click.prevent="onFileSelect">{{ o.label }}</a>
        </li>
      </ul>
      <b-button class="float-right mr-2" squared variant="light" size="sm" @click="close"
        >Cancel</b-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const LOCALSTORAGE_HOST_URI = 'host'
const host = window.localStorage.getItem(LOCALSTORAGE_HOST_URI) || 'http://localhost:8080'
const prefix = ref('')
const data = ref<{
  cwd: string
  folders: string[]
  files: { name: string; size: number }[]
}>({
  folders: [],
  files: [],
  cwd: '',
})

const filteredFiles = computed(() => {
  const items: { label: string; children: unknown[] }[] = []
  if (data.value && data.value.folders) {
    data.value.folders.forEach((item) => {
      const o = {
        label: item,
        children: [],
      }
      items.push(o)
    })
  }
  if (data.value && data.value.files) {
    data.value.files.forEach((item) => {
      const o = {
        label: item.name,
        children: [],
      }
      items.push(o)
    })
  }

  return items.filter((o) => o.label !== prefix.value)
})

const emit = defineEmits(['file', 'close'])

const onFileSelect = (event) => {
  const { text } = event.target
  if (text[text.length - 1] !== '/') {
    emit('file', `${event.target.text}`)
  } else {
    getData(text)
  }
}
const goBack = () => {
  const arr = prefix.value.split('/')
  arr.splice(-2, 1) // Remove last path, but keep leading slash.
  const newPrefix = arr.join('/')
  getData(newPrefix)
}

const getData = (_prefix = '') => {
  fetch(`${host}/files?prefix=${_prefix}`)
    .then((response) => response.json())
    .then((data) => {
      data.value = data
      prefix.value = _prefix
    })
}
const close = () => {
  emit('close')
}

onMounted(() => {
  getData()
})
</script>

<style scoped>
#file-browser {
  width: 100%;
  position: absolute;
  padding: 15px 0;
  left: 0;
  top: 36px;
  background: white;
  border: #ced4da solid 1px;
  z-index: 1;
}
.cwd {
  list-style: none;
  font-family: monospace;
}
</style>
