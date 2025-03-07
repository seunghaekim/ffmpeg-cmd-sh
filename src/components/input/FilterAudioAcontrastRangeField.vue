<template>
  <b-form-group
    class="label"
    :label="`acontrast: ${formStore.filters.acontrast}`"
    label-for="acontrast"
  >
    <!-- TODO: handle update -->
    <b-form-input
      id="acontrast"
      v-bind:value="formStore.filters.acontrast"
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
const max = 100
</script>
