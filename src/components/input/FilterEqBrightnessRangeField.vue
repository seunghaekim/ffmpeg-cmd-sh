<template>
  <b-form-group
    class="label"
    :label="`brightness: ${formStore.filters.brightness}`"
    label-for="brightness"
  >
    <b-form-input
      id="brightness"
      v-model="formStore.filters.brightness"
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
