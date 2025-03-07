<template>
  <b-form-group label="Codec:" label-for="codecs.video">
    <!-- TODO: handle change -->
    <b-form-select class="u-full-width">
      <option :value="null" disabled>-- Please select an option --</option>
      <option v-for="item in videoItems" :key="item.name" :value="item.value">
        {{ item.name }}
      </option>
    </b-form-select>
  </b-form-group>
</template>

<script setup lang="ts">
import options from '@/libs/options'

const {
  codecs: { video: videoItems },
} = options
</script>
