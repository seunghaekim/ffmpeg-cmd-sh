<template>
  <div class="toolbar">
    <div class="mt-4">
      <b-button-group>
        <b-button
          v-if="store.ffmpegEnabled && wsReady"
          class="ml-2 float-right"
          variant="outline-primary"
          @click="encode"
          >{{ encoding ? 'Encoding...' : 'Encode' }}
        </b-button>

        <b-dropdown
          variant="outline-primary"
          split
          :text="copied ? 'Copied' : 'Copy'"
          v-b-tooltip.hover.bottom
          title="Copy to your Clipboard"
          @click="copyToClipboard"
        >
          <b-dropdown-item @click="toggleJSON">
            {{ showJson ? 'Hide' : 'Show' }} JSON
          </b-dropdown-item>
        </b-dropdown>
      </b-button-group>

      <b-button-group class="float-right">
        <b-button class="ml-2 float-right" variant="outline-danger" @click="$emit('reset')"
          >Reset
        </b-button>

        <b-dropdown
          variant="outline-primary"
          split
          v-b-tooltip.hover.bottomright
          title="Save to Local Storage"
          :text="saving ? 'Saving...' : 'Save'"
          @click="save"
        >
          <b-dropdown-item @click="$emit('save', true)"> Save New </b-dropdown-item>
          <b-dropdown-item v-if="formStore.preset.name" @click="deletePreset">
            Delete Preset
          </b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item @click="deleteAllPresetsPrompt">
            Delete All Saved Presets
          </b-dropdown-item>
        </b-dropdown>
      </b-button-group>
    </div>

    <!-- Overlay prompt when deleting all saved presets. -->
    <b-overlay :show="showDeletePrompt" no-wrap @shown="onShown">
      <template v-slot:overlay>
        <div ref="dialog" class="text-center p-3">
          <p>Are you sure you want to delete all saved presets?</p>
          <div>
            <b-button class="mr-3" @click="onCancel">Cancel</b-button>
            <b-button variant="outline-danger" @click="onOK">Delete All Saved Presets</b-button>
          </div>
        </div>
      </template>
    </b-overlay>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from 'vue'
import presets from '../presets'
import useCommonStore from '../stores/common'
import useFormStore from '@/stores/form'

const formStore = useFormStore()

const showJson = ref(false)

// const props = defineProps<{
//   value: { showJSON: boolean }
// }>()

const emit = defineEmits<{
  (e: 'encode'): void
  (e: 'toggleJSON'): void
  (e: 'reset'): void
  (e: 'save', isNew: boolean): void
}>()

const store = useCommonStore()

const encoding = ref(false)
const copied = ref(false)
const saving = ref(false)
const showDeletePrompt = ref(false)

const wsReady = computed(() => {
  return store.wsConnected
})

function encode() {
  encoding.value = true
  setTimeout(() => {
    encoding.value = false
    emit('encode')
  }, 500)
}

function copyToClipboard() {
  // const copyText = this.$parent.$refs.code as HTMLInputElement
  // copyText.select()
  // document.execCommand('copy')
  // copied.value = true
  // setTimeout(() => {
  //   copied.value = false
  // }, 1000)
}

function toggleJSON() {
  emit('toggleJSON')
}

function deletePreset() {
  presets.deletePreset(formStore.preset.id)
  presets.getPresetOptions()
  emit('reset')
}

function deleteAllPresetsPrompt() {
  showDeletePrompt.value = true
}

function deleteAllPresets() {
  presets.deleteAllPresets()
  emit('reset')
}

function save() {
  saving.value = true
  emit('save', false)
  setTimeout(() => {
    saving.value = false
  }, 1000)
}

function onShown() {
  // ;(this.$refs.dialog as HTMLElement).focus()
}

function onCancel() {
  showDeletePrompt.value = false
}

function onOK() {
  deleteAllPresets()
  presets.getPresetOptions()
  showDeletePrompt.value = false
}
</script>
