<template>
  <b-col v-for="item in fields" :key="item.name">
    <b-form-group class="label" :label="`${item.name}:`" :label-for="item.name">
      <!-- TODO: Handle change -->
      <b-form-select class="u-full-width" v-bind:value="formStore.video[item.key]">
        <option :value="null" disabled>-- Please select an option --</option>
        <option v-for="optionItem in item.options" :key="optionItem.name" :value="optionItem.value">
          {{ optionItem.name }}
        </option>
      </b-form-select>
    </b-form-group>
  </b-col>
</template>

<script setup lang="ts">
import options from '@/libs/options'
import type { VideoEditItems } from '@/stores/form'
import useFormStore from '@/stores/form'

const formStore = useFormStore()

const fields: {
  name: string
  key: keyof VideoEditItems
  options:
    | typeof options.pixelFormats
    | typeof options.frameRates
    | typeof options.speeds
    | typeof options.tunes
    | typeof options.profiles
    | typeof options.levels
}[] = [
  {
    name: 'Pixel Format',
    key: 'pixel_format',
    options: options.pixelFormats,
  },
  {
    name: 'Frame Rate',
    key: 'frame_rate',
    options: options.frameRates,
  },
  {
    name: 'Speed',
    key: 'speed',
    options: options.speeds,
  },
  {
    name: 'Tune',
    key: 'tune',
    options: options.tunes,
  },
  {
    name: 'Profile',
    key: 'profile',
    options: options.profiles,
  },
  {
    name: 'Level',
    key: 'level',
    options: options.levels,
  },
]
</script>
