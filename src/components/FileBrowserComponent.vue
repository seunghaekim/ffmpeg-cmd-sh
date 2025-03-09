<template>
  <div id="file-browser">
    <div>
      <div class="b-row m-2">
        <input type="file" @change="handleFileChange" accept="video/*" />
      </div>
      <div class="b-row m-2 d-flex">
        <b-button-group :style="{ 'margin-left': 'auto' }">
          <b-button variant="danger" size="sm" @click="handleDelete" :disabled="!fileStore.hasFiles"
            >Delete</b-button
          >
          <b-button variant="primary" size="sm" @click="emit('close')">close</b-button>
        </b-button-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useFileStore from '@/stores/file'

const fileStore = useFileStore()

const emit = defineEmits<{
  (e: 'file', filename: string): void
  (e: 'close'): void
}>()

function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    const first = input.files[0]

    fileStore.$patch((store) => {
      if (input.files !== null) {
        store.files = [...input.files].map((file) => {
          return {
            ...file,
            url: URL.createObjectURL(file),
          }
        })
      }
    })

    emit('file', first.name)
    return
  }

  emit('file', '')
}

function handleDelete() {
  fileStore.$patch((store) => {
    store.files?.map((file) => {
      URL.revokeObjectURL(file.url)
    })

    store.files = undefined
  })
  emit('file', '')
}
</script>

<style scoped>
#file-browser {
  width: 100%;
  position: absolute;
  left: 0;
  top: 36px;
  background: white;
  border: #ced4da solid 1px;
  z-index: 1;
}
</style>
