<template>
  <div style="display: none"></div>
</template>
<script setup lang="ts">
import useFFmpegStore from '@/stores/ffmpeg'
import { onMounted } from 'vue'

const ffmpegStore = useFFmpegStore()

onMounted(async () => {
  try {
    await ffmpegStore.initialize()
  } catch (error) {
    console.error('Failed to initialize ffmpegStore:', error)
  }
})
</script>
