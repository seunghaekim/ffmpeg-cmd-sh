<template>
  <b-button-group class="float-right">
    <b-dropdown
      variant="outline-primary"
      split
      v-b-tooltip.hover.bottomright
      title="Save to Local Storage"
      :text="saving ? 'Saving...' : 'Save'"
    >
      <b-dropdown-item>Save New</b-dropdown-item>
      <b-dropdown-item> Delete Preset </b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item> Delete All Saved Presets </b-dropdown-item>
    </b-dropdown>
  </b-button-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const saving = ref(false)
</script>
