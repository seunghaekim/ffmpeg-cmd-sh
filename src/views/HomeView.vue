<script setup lang="ts">
import EditorComponent from '@/components/EditorComponent.vue'
import LogViewerComponent from '@/components/LogViewerComponent.vue'

const onEncode = () => {
  // Emit the 'onEncode' event
  const event = new CustomEvent('onEncode')
  window.dispatchEvent(event)
}
</script>

<template>
  <div class="home">
    <EditorComponent @onEncode="onEncode" />
    <LogViewerComponent />
  </div>
</template>
