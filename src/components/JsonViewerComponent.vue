<template>
  <div class="json-viewer">
    <b-card v-if="1" no-body class="mt-3" header="JSON Format">
      <pre><code>{{ formString }}</code></pre>
    </b-card>
  </div>
</template>

<script setup lang="ts">
import useFormStore from '@/stores/form'

import { computed } from 'vue'

const formStore = useFormStore()

const formString = computed(() => {
  const json = formStore.transformToJson

  // Only return non-null values in JSON string.
  const jsonStr = JSON.stringify(
    json,
    (k, v) => {
      if (v === null) return undefined
      return v
    },
    2,
  )
  return jsonStr
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
