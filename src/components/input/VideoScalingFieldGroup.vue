<template>
  <b-col v-for="field in fields" :key="field.name">
    <b-form-group class="label" :label="`${field.name}:`" :label-for="field.key">
      <!-- TODO: Handle change -->
      <b-form-select class="u-full-width" v-bind:value="formStore.video[field.key]">
        <option :value="null" disabled>-- Please select an option --</option>
        <option v-for="o in field.options" :key="o.name" :value="o.value">{{ o.name }}</option>
      </b-form-select>
    </b-form-group>
  </b-col>
</template>

<script setup lang="ts">
import options from '@/libs/options'
import type { VideoScalingItems } from '@/stores/form'
import useFormStore from '@/stores/form'

const formStore = useFormStore()

interface Field {
  name: string
  key: keyof VideoScalingItems
  options:
    | typeof options.fastStart
    | typeof options.sizes
    | typeof options.formats
    | typeof options.formats
    | typeof options.aspects
    | typeof options.scalings
}

const fields: Field[] = [
  { name: 'Faststart', key: 'faststart', options: options.fastStart },
  { name: 'Size', key: 'size', options: options.sizes },
  { name: 'Format', key: 'format', options: options.formats },
  { name: 'Aspect', key: 'aspect', options: options.aspects },
  { name: 'Scaling', key: 'scaling', options: options.scalings },
]
</script>
