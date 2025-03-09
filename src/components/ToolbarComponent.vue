<template>
  <div class="toolbar">
    <div class="mt-4">
      <div class="d-flex">
        <div :style="{ 'margin-right': 'auto' }">
          <ToolbarJsonControlField />
        </div>

        <b-button-group>
          <ResetButton />
        </b-button-group>
      </div>
    </div>

    <!-- Overlay prompt when deleting all saved presets. -->
    <!-- <b-overlay :show="showDeletePrompt" no-wrap @shown="onShown">
      <template v-slot:overlay>
        <div ref="dialog" class="text-center p-3">
          <p>Are you sure you want to delete all saved presets?</p>
          <div>
            <b-button class="mr-3" @click="onCancel">Cancel</b-button>
            <b-button variant="outline-danger" @click="onOK">Delete All Saved Presets</b-button>
          </div>
        </div>
      </template>
    </b-overlay> -->
  </div>
</template>

<script setup lang="ts">
// import { ref, computed, defineEmits } from 'vue'
// import presets from '../presets'
// import useControlStore from '../stores/control'
// import useFormStore from '@/stores/form'
import ResetButton from './input/toolbar/ResetButton.vue'
import ToolbarJsonControlField from './input/ToolbarJsonControlField.vue'

// const controlStore = useControlStore()
// const formStore = useFormStore()

// const showJson = ref(false)

// const props = defineProps<{
//   value: { showJSON: boolean }
// }>()

// const emit = defineEmits<{
//   (e: 'encode'): void
//   (e: 'toggleJSON'): void
//   (e: 'reset'): void
//   (e: 'save', isNew: boolean): void
// }>()

// const store = useCommonStore()

// const encoding = ref(false)
// const copied = ref(false)
// const showDeletePrompt = ref(false)

// const wsReady = computed(() => {
//   return store.wsConnected
// })

// function encode() {
//   encoding.value = true
//   setTimeout(() => {
//     encoding.value = false
//     emit('encode')
//   }, 500)
// }

// function deletePreset() {
//   presets.deletePreset(formStore.preset.id)
//   presets.getPresetOptions()
//   emit('reset')
// }

// function deleteAllPresetsPrompt() {
//   showDeletePrompt.value = true
// }

// function deleteAllPresets() {
//   presets.deleteAllPresets()
//   emit('reset')
// }

// function save() {
//   saving.value = true
//   emit('save', false)
//   setTimeout(() => {
//     saving.value = false
//   }, 1000)
// }

// function onShown() {
//   // ;(this.$refs.dialog as HTMLElement).focus()
// }

// function onCancel() {
//   showDeletePrompt.value = false
// }

// function onOK() {
//   deleteAllPresets()
//   presets.getPresetOptions()
//   showDeletePrompt.value = false
// }
</script>
