<template>
  <b-form-group class="label" :label="`CRF: ${formStore.video.crf}`" label-for="crf">
    <b-form-input
      id="crf"
      v-model="formStore.video.crf"
      type="range"
      min="0"
      max="51"
    ></b-form-input>
  </b-form-group>
</template>

<script setup lang="ts">
import useFormStore from '@/stores/form'

const formStore = useFormStore()
</script>
