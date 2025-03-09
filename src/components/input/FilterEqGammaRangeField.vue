<template>
  <b-form-group class="label" :label="`gamma: ${formStore.filters.gamma}`" label-for="gamma">
    <b-form-input
      id="gamma"
      v-model="formStore.filters.gamma"
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
