<template>
  <b-form-group class="label" label="Bitrate:" label-for="bitrate">
    <!-- TODO: handle update -->
    <b-form-input v-bind:value="formStore.audio.bitrate"></b-form-input>
  </b-form-group>
</template>
<script setup lang="ts">
import useFormStore from '@/stores/form'

const formStore = useFormStore()
</script>
