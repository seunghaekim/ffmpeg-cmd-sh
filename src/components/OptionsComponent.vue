<template>
  <div>
    <b-form-row>
      <b-col>
        <b-form-group label="Extra Flags:">
          <b-form-checkbox
            v-for="option in extraOptions"
            v-model="extra"
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
          <b-form-select class="u-full-width" v-model="loglevel">
            <option :value="null" disabled>-- Please select an option --</option>
            <option v-for="o in logLevels" :key="o.name" :value="o.value">{{ o.name }}</option>
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-form-row>
    <hr />

    <b-form-row>
      <b-col>
        <b-form-group label="FFmpegd:">
          <b-form-checkbox v-model="ffmpegd" switch>
            <span class="desc">
              Enable sending encode jobs to <code>ffmpegd</code> (experimental).
              <p class="small text-muted">*<strong>ffmpegd</strong> must be running to connect.</p>
            </span>
          </b-form-checkbox>
        </b-form-group>
      </b-col>
    </b-form-row>
    <p>⚠️ Options will be saved to Local Storage for convenience.</p>
  </div>
</template>

<script setup lang="ts">
import useCommonStore from '@/stores/common'
import options from '../libs/options'
import storage from '../libs/storage'

const { extraOptions, logLevels } = options

import { ref, onMounted, watch } from 'vue'

const extra = ref<string[]>([])
const loglevel = ref<string>('none')
const ffmpegd = ref<boolean>(false)

const $store = useCommonStore()

onMounted(async () => {
  extra.value = storage.getItem('options') || []
  loglevel.value = storage.getItem('loglevel') || 'none'
  ffmpegd.value = storage.getItem('ffmpegd') || false

  // await update('extra', extra.value)
  // await update('loglevel', loglevel.value)
  // await update('ffmpegd', ffmpegd.value)

  // Start ffmpegd if option enabled and no ws connection.
  // if (ffmpegd.value && !this.$ws.conn) {
  //   this.$ws.start()
  // }
})

watch([extra, loglevel, ffmpegd], setSettingsStorage)

function setSettingsStorage() {
  storage.setItem('options', extra.value)
  storage.setItem('loglevel', loglevel.value)
  storage.setItem('ffmpegd', ffmpegd.value)
  $store.setFfmpegEnabled(ffmpegd.value)
}

// function update(key: string, value: any) {
//   setSettingsStorage()
//   this.$emit('input', { ...this.value, [key]: value })

//   // Toggle ffmpegd.
//   if (key === 'ffmpegd') {
//     if (ffmpegd.value && !this.$ws.conn) {
//       this.$ws.start()
//     } else if (!ffmpegd.value && this.$ws.conn) {
//       this.$ws.stop()
//     }
//   }
// }
</script>

<style scoped>
.desc {
  text-transform: none !important;
}
</style>
