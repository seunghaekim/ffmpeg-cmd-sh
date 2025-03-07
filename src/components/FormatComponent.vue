<!-- TODO: handle update -->
<template>
  <div>
    <b-form-row>
      <b-col>
        <b-form-group label="Container:" label-for="container">
          <b-form-select class="u-full-width" :value="formStore.format.container">
            <option :value="null" disabled>-- Please select an option --</option>
            <optgroup v-for="(o, i) in options.containers" :label="i.toString()" v-bind:key="i">
              <option v-for="item in o" :key="item.name" :value="item.value">
                {{ item.name }}
              </option>
            </optgroup>
          </b-form-select>
        </b-form-group>
      </b-col>

      <b-col>
        <b-form-group label="Clip:" label-for="clip">
          <b-form-select class="u-full-width" v-bind:value="formStore.format.clip">
            <option :value="null" disabled>-- Please select an option --</option>
            <option v-for="o in options.clip" :key="o.name" :value="o.value">{{ o.name }}</option>
          </b-form-select>
        </b-form-group>
      </b-col>

      <b-col v-if="formStore.format.clip">
        <b-form-group label="Start Time:" label-for="start-time">
          <b-form-input
            v-bind:value="formStore.format.startTime"
            placeholder="00:00:00.000"
          ></b-form-input>
        </b-form-group>
      </b-col>

      <b-col v-if="formStore.format.clip">
        <b-form-group label="Stop Time:" label-for="stop-time">
          <b-form-input
            v-bind:value="formStore.format.stopTime"
            placeholder="00:00:00.000"
          ></b-form-input>
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
