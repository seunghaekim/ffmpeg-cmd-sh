<template>
  <b-button @click="handleReset" class="ml-2 float-right" variant="outline-danger">Reset </b-button>
</template>
<script setup lang="ts">
import useFormStore from '@/stores/form'
import cloneDeep from 'lodash.clonedeep'

const formStore = useFormStore()

const defaultValue = cloneDeep(formStore.$state)

function handleReset() {
  if (confirm('Are you sure you want to reset the form?')) {
    formStore.$patch(defaultValue)
  }
}
</script>
