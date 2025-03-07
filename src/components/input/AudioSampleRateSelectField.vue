<template>
  <b-form-group class="label" label="SampleRate:" label-for="sampleRate">
    <!-- TODO: handle Change -->
    <b-form-select class="u-full-width" v-bind:value="formStore.audio.sampleRate">
      <option :value="null" disabled>-- Please select an option --</option>
      <option v-for="o in options.sampleRates" :key="o.name" :value="o.value">
        {{ o.name }}
      </option>
    </b-form-select>
  </b-form-group>
</template>

<script setup lang="ts">
import options from '@/libs/options'
import useFormStore from '@/stores/form'

const formStore = useFormStore()
</script>
