<template>
  <div class="log-viewer" v-if="ffmpegStore.status === 'ready'">
    <b-card no-body class="mt-3" header="FFmpeg Log" style="max-height: 20em">
      <pre>
        <code v-for="line in ffmpegStore.logs" :key="[new Date().getTime(), new Date().getMilliseconds(), line.type, line.message].join('')">{{ `${line.type}\t${line.message}` }}</code>
    </pre>
    </b-card>
  </div>
</template>
<script setup lang="ts">
import useFFmpegStore from '@/stores/ffmpeg'

const ffmpegStore = useFFmpegStore()
</script>

<style scoped>
pre {
  background: #343a40;
  color: #fff;
  display: block;
  font-family: 'Source Code Pro', monospace;
  margin: 0;
  padding: 20px;
}

pre code {
  white-space: normal;
  display: block;
}
</style>
