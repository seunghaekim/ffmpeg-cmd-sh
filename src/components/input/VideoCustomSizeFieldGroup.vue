<template>
  <b-col v-if="formStore.video.size == 'custom'">
    <b-form-group label="Width:" label-for="width">
      <b-form-input v-model="formStore.video.width" placeholder="Width"></b-form-input>
    </b-form-group>
  </b-col>

  <b-col v-if="formStore.video.size == 'custom'">
    <b-form-group label="Height:" label-for="height">
      <b-form-input v-model="formStore.video.height" placeholder="Height"></b-form-input>
    </b-form-group>
  </b-col>
</template>

<script setup lang="ts">
import useFormStore from '@/stores/form'

const formStore = useFormStore()
</script>
