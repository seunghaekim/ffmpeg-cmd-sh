<template>
  <b-form-group
    class="label"
    :label="`saturation: ${formStore.filters.saturation}`"
    label-for="saturation"
  >
    <b-form-input
      id="saturation"
      v-model="formStore.filters.saturation"
      type="range"
      :min="min"
      :max="max"
    ></b-form-input>
  </b-form-group>
</template>
<script setup lang="ts">
import useFormStore from '@/stores/form'

const formStore = useFormStore()
const min = 0
const max = 300
</script>
