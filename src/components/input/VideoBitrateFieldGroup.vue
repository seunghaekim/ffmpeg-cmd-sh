<template>
  <b-col v-for="field in fields" :key="field.key">
    <b-form-group class="label" :label="`${field.name}:`" :label-for="field.key">
      <b-form-input
        v-model="formStore.video[field.key]"
        :placeholder="field.name"
        :disabled="field.key === 'gopsize' ? !isSupported(formStore.video.codec) : false"
      />
    </b-form-group>
  </b-col>
</template>

<script setup lang="ts">
import useFormStore from '@/stores/form'
import type { VideoBitrateItems } from '@/types/form'
import type { CodecValues, CodecVideoValues } from '@/types/values'

const formStore = useFormStore()

const fields: {
  name: string
  key: keyof VideoBitrateItems
  supported?: CodecValues[]
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
