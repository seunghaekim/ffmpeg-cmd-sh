<template>
  <b-form-textarea
    id="codec-options"
    v-model="formStore.video.codec_options"
    :placeholder="`Set optional -${formStore.video.codec}-params here to overwrite encoder options.`"
    rows="1"
    max-rows="6"
  ></b-form-textarea>
</template>
<script setup lang="ts">
import useFormStore from '@/stores/form'

const formStore = useFormStore()
</script>
