<template>
  <b-form-group class="label" label="deshake:" label-for="deshake">
    <!-- TODO: handle update -->
    <b-form-select class="u-full-width" v-bind:value="formStore.filters.deshake">
      <option :value="null" disabled>-- Please select an option --</option>
      <option v-for="o in options.deshake" :key="o.name" :value="o.value">{{ o.name }}</option>
    </b-form-select>
  </b-form-group>
</template>

<script setup lang="ts">
import options from '@/libs/options'
import useFormStore from '@/stores/form'

const formStore = useFormStore()
</script>
