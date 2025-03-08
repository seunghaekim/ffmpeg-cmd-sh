<template>
  <b-form-group class="label" label="channel" label-for="channel">
    <b-form-select class="u-full-width" v-model="formStore.audio.channel">
      <option :value="null" disabled>-- Please select an option --</option>
      <option v-for="o in options.audioChannels" :key="o.name" :value="o.value">
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
