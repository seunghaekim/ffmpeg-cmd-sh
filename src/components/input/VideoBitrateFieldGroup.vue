<template>
  <b-col v-for="field in fields" :key="field.key">
    <b-form-group class="label" :label="`${field.name}:`" :label-for="field.key">
      <!-- TODO: handle change -->
      <b-form-input
        v-if="field.key === 'gopsize' ? isSupported(form.video.codec) : true"
        v-bind:value="form.video[field.key]"
        :placeholder="field.name"
      />
    </b-form-group>
  </b-col>
</template>

<script setup lang="ts">
import type { CodecVideoValues } from '@/libs/options'
import type { VideoBitrateItems } from '@/stores/form'
import useFormStore from '@/stores/form'

const form = useFormStore()

const fields: {
  name: string
  key: keyof VideoBitrateItems
  supported?: string[]
}[] = [
  {
    name: 'Bitrate',
    key: 'bitrate',
  },
  {
    name: 'Min Bitrate',
    key: 'minrate',
  },
  {
    name: 'Max Bitrate',
    key: 'maxrate',
  },
  {
    name: 'Buffer Size',
    key: 'bufsize',
  },
  {
    name: 'GOP Size',
    key: 'gopsize',
    supported: ['x264', 'vp9'],
  },
]

function isSupported(codec: CodecVideoValues): boolean {
  const gopsize = fields.find((item) => item.key === 'gopsize')
  return gopsize?.supported?.includes(codec) ?? false
}
</script>
