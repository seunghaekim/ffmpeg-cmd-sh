<template>
  <div>
    <b-form-row>
      <b-col>
        <AudioCodecSelectField />
      </b-col>
      <b-col>
        <AudioChannelSelectField />
      </b-col>
      <b-col>
        <AudioQualitySelectField />
      </b-col>
      <b-col>
        <AudioSampleRateSelectField />
      </b-col>

      <b-col v-if="formStore.audio.quality == 'custom'">
        <AudioBitrateField />
      </b-col>

      <b-col>
        <AudioVolumeField />
      </b-col>
    </b-form-row>
  </div>
</template>

<script setup lang="ts">
import AudioCodecSelectField from './input/AudioCodecSelectField.vue'
import AudioChannelSelectField from './input/AudioChannelSelectField.vue'
import AudioQualitySelectField from './input/AudioQualitySelectField.vue'
import AudioSampleRateSelectField from './input/AudioSampleRateSelectField.vue'
import AudioBitrateField from './input/AudioBitrateField.vue'
import AudioVolumeField from './input/AudioVolumeField.vue'
import useFormStore from '@/stores/form'

const formStore = useFormStore()
</script>
