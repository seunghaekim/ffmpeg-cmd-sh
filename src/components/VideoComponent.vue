<template>
  <div>
    <!-- 1st Row: Codec and Preset options -->
    <b-form-row>
      <b-col>
        <VideoCodecSelectField />
      </b-col>
      <b-col>
        <PresetSelectField />
      </b-col>
      <b-col>
        <PassOptionsSelectField />
      </b-col>
    </b-form-row>

    <!-- CRF slider if CRF enabled -->
    <div v-if="formStore.video.pass == 'crf'">
      <CrfRangeField />
    </div>
    <hr />

    <!-- 2nd Row: Bit rate options -->
    <b-form-row>
      <BitrateFieldGroup />
    </b-form-row>
    <hr />

    <!-- 3rd Row: Video editing options -->
    <b-form-row>
      <VideoEditFieldGroup />
    </b-form-row>
    <hr />

    <!-- 4th Row: Video scaling options -->
    <b-form-row>
      <VideoScalingFieldGroup />
    </b-form-row>

    <!-- Width and Height inputs if Custom Size is enabled -->
    <b-form-row>
      <VideoCustomSizeFieldGroup />
    </b-form-row>
    <hr />

    <!-- Optional Codec Params -->
    <b-form-group
      v-if="['x264', 'x265'].includes(formStore.video.codec)"
      label="Codec Options:"
      label-for="codec-options"
    >
      <VideoCodecOptionTextArea />
    </b-form-group>
  </div>
</template>

<script setup lang="ts">
import PresetSelectField from './input/PresetSelectField.vue'
import PassOptionsSelectField from './input/VideoPassOptionsSelectField.vue'
import CrfRangeField from './input/VideoCrfRangeField.vue'
import useFormStore from '@/stores/form'
import BitrateFieldGroup from './input/VideoBitrateFieldGroup.vue'
import VideoEditFieldGroup from './input/VideoEditFieldGroup.vue'
import VideoScalingFieldGroup from './input/VideoScalingFieldGroup.vue'
import VideoCustomSizeFieldGroup from './input/VideoCustomSizeFieldGroup.vue'
import VideoCodecOptionTextArea from './input/VideoCodepOptionTextarea.vue'
import VideoCodecSelectField from './input/VideoCodecSelectField.vue'

const formStore = useFormStore()
</script>
