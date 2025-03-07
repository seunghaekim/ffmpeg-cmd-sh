<template>
  <div>
    <h4>Video</h4>
    <hr />
    <b-form-row>
      <b-col>
        <FilterVideoDebandSelectField />
      </b-col>
      <b-col>
        <FilterVideoDeflickerSelectField />
      </b-col>
      <b-col>
        <FilterVideoDeshakeSelectField />
      </b-col>
      <b-col>
        <FilterVideoDejudderSelectField />
      </b-col>
      <b-col>
        <FilterVideoDenoiseSelectField />
      </b-col>
      <b-col>
        <FilterVideoDeinterlaceSelectField />
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col>
        <FilterEqContrastRangeField />
      </b-col>
      <b-col>
        <FilterEqBrightnessRangeField />
      </b-col>
      <b-col>
        <FilterEqSaturationRangeField />
      </b-col>
      <b-col>
        <FilterEqGammaRangeField />
      </b-col>
    </b-form-row>

    <h4>Audio</h4>
    <hr />
    <b-form-row>
      <b-col>
        <FilterAudioAcontrastRangeField />
      </b-col>
    </b-form-row>
  </div>
</template>

<script setup lang="ts">
import FilterVideoDebandSelectField from './input/FilterVideoDebandSelectField.vue'
import FilterVideoDeflickerSelectField from './input/FilterVideoDeflickerSelectField.vue'
import FilterVideoDeshakeSelectField from './input/FilterVideoDeshakeSelectField.vue'
import FilterVideoDejudderSelectField from './input/FilterVideoDejudderSelectField.vue'
import FilterVideoDenoiseSelectField from './input/FilterVideoDenoiseSelectField.vue'
import FilterVideoDeinterlaceSelectField from './input/FilterVideoDeinterlaceSelectField.vue'
import FilterEqContrastRangeField from './input/FilterEqContrastRangeField.vue'
import FilterEqBrightnessRangeField from './input/FilterEqBrightnessRangeField.vue'
import FilterEqSaturationRangeField from './input/FilterEqSaturationRangeField.vue'
import FilterEqGammaRangeField from './input/FilterEqGammaRangeField.vue'
import FilterAudioAcontrastRangeField from './input/FilterAudioAcontrastRangeField.vue'
</script>
