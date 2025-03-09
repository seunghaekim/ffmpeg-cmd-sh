<template>
  <b-button-group>
    <b-button
      class="text-nowrap"
      :variant="copied ? 'outline-success' : 'outline-primary'"
      v-b-tooltip.hover.top="{ title: 'Copy to your Clipboard' }"
      @click="copyToClipboard"
      >{{ copied ? 'Copied' : 'Copy' }}
    </b-button>
    <b-button
      variant="outline-info"
      class="text-nowrap"
      v-b-tooltip.hover.top="{ title: 'Show JSON Output' }"
      @click="toggleJSON"
      >{{ !controlStore.showJson ? 'Show JSON' : 'Hide JSON' }}</b-button
    >
  </b-button-group>
</template>
<script setup lang="ts">
import useControlStore from '@/stores/control'
import useFormStore from '@/stores/form'
import { ref } from 'vue'

const formStore = useFormStore()
const controlStore = useControlStore()

const copied = ref(false)

function toggleJSON() {
  controlStore.$patch((store) => {
    store.showJson = !store.showJson
  })
}

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(formStore.jsonString)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (e) {
    alert('Failed to copy to clipboard. Please try again.')
    console.error('Failed to copy to clipboard:', e)
  }
}
</script>
