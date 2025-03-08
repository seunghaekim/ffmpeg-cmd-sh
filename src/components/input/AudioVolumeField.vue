<template>
  <b-form-group label="Volume:" label-for="volume">
    <b-form-input v-model="formStore.audio.volume" type="number"></b-form-input>
  </b-form-group>
</template>

<script setup lang="ts">
import useFormStore from '@/stores/form'

const formStore = useFormStore()
</script>
