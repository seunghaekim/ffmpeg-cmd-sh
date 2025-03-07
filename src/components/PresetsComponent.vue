<template>
  <div class="presets">
    <b-form-row>
      <b-col cols="6">
        <b-form-group label="Preset: " label-for="preset">
          <b-form-select
            class="u-full-width"
            v-bind:value="formStore.video.preset"
            @change="handleVideoPresetChange"
          >
            <optgroup v-for="(o, i) in presetOptions" :label="o.name" v-bind:key="i">
              <option v-for="item in o.data" :key="item.name" :value="item.value">
                {{ item.name }}
              </option>
            </optgroup>
          </b-form-select>
        </b-form-group>
      </b-col>

      <b-col v-if="false">
        <b-form-group label="Preset Name:" label-for="preset-name" v-if="formStore.video.preset">
          <b-form-input v-bind:value="formStore.video.preset"></b-form-input>
        </b-form-group>
      </b-col>
    </b-form-row>
  </div>
</template>

<script setup lang="ts">
import useFormStore from '@/stores/form'
import presets from '../presets'
import { objectKeys, recursiveMerge } from '@/libs/util/object'
import type { Form } from '@/types/form'

const formStore = useFormStore()
const presetOptions = presets.getPresetOptions()

const flattenOptions = presets.getPresetOptions().flatMap((option) => {
  return option.data
})

async function handleVideoPresetChange(option: string) {
  const exists = flattenOptions.find((o) => o.value === option)

  if (!exists) {
    alert('Preset not found')
    return
  }

  const data = await presets.getPreset(exists.value)

  formStore.$reset()
  formStore.$patch(recursiveMerge(formStore, data))

  console.log(formStore)
}
</script>
