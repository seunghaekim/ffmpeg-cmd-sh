<template>
  <b-form-group
    class="label"
    :label="`Contrast: ${formStore.filters.contrast}`"
    label-for="contrast"
  >
    <b-form-input
      id="contrast"
      v-model="formStore.filters.contrast"
      type="range"
      :min="min"
      :max="max"
    ></b-form-input>
  </b-form-group>
</template>
<script setup lang="ts">
import useFormStore from '@/stores/form'

const formStore = useFormStore()
const min = -100
const max = 100
</script>
