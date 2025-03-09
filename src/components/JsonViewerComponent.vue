<template>
  <div class="json-viewer" v-if="controlStore.showJson">
    <b-card no-body class="mt-3" header="JSON Format" style="max-height: 20em">
      <pre><code>{{ jsonString }}</code></pre>
    </b-card>
  </div>
</template>

<script setup lang="ts">
import useControlStore from '@/stores/control'
import useFormStore from '@/stores/form'
import { computed } from 'vue'

const formStore = useFormStore()
const controlStore = useControlStore()

const jsonString = computed(() => {
  return formStore.jsonString
})
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
</style>
