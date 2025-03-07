<template>
  <b-form-group label="Preset:" label-for="presets">
    <!-- TODO: handle change -->
    <b-form-select class="u-full-width">
      <option :value="null" disabled>-- Please select an option --</option>
      <option v-for="item in options.presets" :key="item.name" :value="item.value">
        {{ item.name }}
      </option>
    </b-form-select>
  </b-form-group>
</template>

<script setup lang="ts">
import options from '@/libs/options'
</script>
