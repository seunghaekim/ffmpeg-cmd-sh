<template>
  <div>
    <b-form-row>
      <b-col>
        <b-form-group label="Extra Flags:">
          <b-form-checkbox
            v-for="option in options.extraOptions"
            v-model="formStore.options.extra"
            :key="option.value"
            :value="option.value"
            switch
          >
            <span class="desc">{{ option.text }}</span>
          </b-form-checkbox>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col cols="4">
        <b-form-group label="Log Level: " label-for="loglevel">
          <b-form-select class="u-full-width" v-model="formStore.options.loglevel">
            <option :value="null" disabled>-- Please select an option --</option>
            <option v-for="o in options.logLevels" :key="o.name" :value="o.value">
              {{ o.name }}
            </option>
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-form-row>
  </div>
</template>

<script setup lang="ts">
import options from '@/libs/options'
import useFormStore from '@/stores/form'

const formStore = useFormStore()
</script>

<style scoped>
.desc {
  text-transform: none !important;
}
</style>
