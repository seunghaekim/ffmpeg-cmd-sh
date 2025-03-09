<template>
  <b-button-group>
    <b-button
      class="text-nowrap"
      @click="encode"
      variant="primary"
      :disabled="encodeButtonDisabled"
      v-b-tooltip.top="{ title: 'Update File Input' }"
      >{{ buttonLabel }} <b-spinner v-if="encodingStatus === 'encoding'" small></b-spinner
    ></b-button>
    <b-button
      :href="output.dataUrl"
      :download="output.filename"
      @click="handleClickDownload"
      :disabled="!output.dataUrl"
      >Download</b-button
    >
  </b-button-group>
</template>
<script setup lang="ts">
import ffmpeg from '@/libs/ffmpeg'
import formAdapter from '@/libs/formAdapter'
import useFFmpegStore from '@/stores/ffmpeg'
import useFileStore from '@/stores/file'
import useFormStore from '@/stores/form'
import { fetchFile } from '@ffmpeg/util'
import { computed, ref } from 'vue'

const formStore = useFormStore()
const fileStore = useFileStore()
const ffmpegStore = useFFmpegStore()

const encodingStatus = ref<'idle' | 'encoding' | 'encoded'>('idle')
const output = ref<{
  dataUrl: string | null
  filename: string | null
}>({ dataUrl: null, filename: null })

const buttonLabel = computed(() => {
  switch (encodingStatus.value) {
    case 'idle':
      return 'Encode'
    case 'encoding':
      return 'Encoding...'
    case 'encoded':
      return 'Encoded'
    default:
      return 'Encode'
  }
})

const encodeButtonDisabled = computed<boolean>(() => {
  return !fileStore.hasFiles || !(ffmpegStore.status === 'ready')
})

const flags = computed(() => {
  const options = formAdapter.ffmpegOptionsFromForm(formStore.$state)
  return ffmpeg.flags(options)
})

async function encode() {
  if (encodeButtonDisabled.value) {
    alert('FFmpeg is not ready or no files are selected.')
    return
  }

  encodingStatus.value = 'encoding'

  const ffmpeg = ffmpegStore.ffmpeg
  const file = fileStore.files?.[0]

  if (!file) {
    encodingStatus.value = 'idle'
    alert('No file selected.')
    return
  }

  output.value.filename = formStore.io.output

  const [_, ..._flags] = flags.value

  const encodedFlags = _flags.map((flag) => {
    if (flag === formStore.io.output || flag === formStore.io.input) {
      return encodeURI(flag)
    }

    return flag
  })

  await ffmpeg?.writeFile(output.value.filename, await fetchFile(file.url))
  await ffmpeg?.exec(encodedFlags)

  console.log({ encodedFlags })

  const data = await ffmpeg?.readFile(output.value.filename)
  const dataUrl = URL.createObjectURL(
    new Blob([(data as Uint8Array).buffer], { type: 'video/mp4' }),
  )

  output.value.dataUrl = dataUrl

  encodingStatus.value = 'encoded'

  alert('Encoding complete.')
}

function handleClickDownload() {
  if (output.value.dataUrl) {
    const dataUrl = `${output.value.dataUrl}`

    output.value = {
      dataUrl: null,
      filename: null,
    }

    setTimeout(() => {
      URL.revokeObjectURL(dataUrl)
    }, 100)
  }
  encodingStatus.value = 'idle'
}
</script>
