<template>
  <div class="toolbar">
    <div class="mt-4">
      <div class="d-flex">
        <div :style="{ 'margin-right': 'auto' }">
          <b-row>
            <b-col>
              <JsonControlField />
            </b-col>
            <b-col>
              <EncodeButton />
            </b-col>
          </b-row>
        </div>

        <b-button-group>
          <ResetButton />
        </b-button-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ResetButton from './input/toolbar/ResetButton.vue'
import JsonControlField from './input/toolbar/JsonControlField.vue'
import EncodeButton from './input/toolbar/EncodeButton.vue'
</script>
