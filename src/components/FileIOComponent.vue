<!-- TODO: fix all -->
<template>
  <div class="input">
    <b-form-row>
      <!-- Input -->
      <b-col>
        <b-form-group label="Input:" label-for="input">
          <b-input-group>
            <b-form-select
              class="protocol"
              v-model="protocolInputName"
              @change="
                (value: ProtocolNames) => {
                  formStore.$patch((store) => {
                    const _value = options.protocols.find((o) => o.name === value)?.value

                    if (!_value) {
                      throw new Error(`Protocol not found: ${value}`)
                    }

                    store.io.input = _value
                  })
                }
              "
            >
              <option v-for="o in options.protocols" :key="o.name" :value="o.name">
                {{ o.name }}
              </option>
            </b-form-select>

            <b-form-input
              v-model="formStore.io.input"
              placeholder="input.mp4"
              @change="
                (value: string) => {
                  formStore.$patch((store) => {
                    store.io.input = value
                  })
                }
              "
            />

            <!-- originals <b-form-input
              v-if="!$store.ffmpegEnabled || !$store.wsConnected"
              v-bind:value="formStore.io.input"
              :state="Boolean(formStore.io.input)"
              placeholder="Example: input.mp4"
              @input="update('input', $event)"
            ></b-form-input>

            <b-form-input
              v-else
              v-model="formStore.io.input"
              placeholder=""
              @focus="onFileFocus"
              @input="update('input', $event)"
            ></b-form-input> -->

            <!-- <div v-if="showFileBrowser">
              <FileBrowserComponent v-on:file="onFileSelect" v-on:close="onClose" />
            </div> -->
          </b-input-group>
        </b-form-group>
      </b-col>

      <!-- Output -->
      <b-col>
        <b-form-group label="Output:" label-for="output">
          <b-input-group>
            <b-form-select
              class="protocol"
              v-model="protocolOutputName"
              @chanage="
                (value: ProtocolNames) => {
                  formStore.$patch((store) => {
                    const _value = options.protocols.find((o) => o.name === value)?.value

                    if (!_value) {
                      throw new Error(`Protocol not found: ${value}`)
                    }

                    store.io.output = _value
                  })
                }
              "
            >
              <option v-for="o in options.protocols" :key="o.name" :value="o.name">
                {{ o.name }}
              </option>
            </b-form-select>
            <b-form-input v-model="formStore.io.output" placeholder="Example: output.mp4" />
          </b-input-group>

          <!-- originals <b-input-group>
            <b-form-select
              v-if="!$store.ffmpegEnabled"
              class="protocol"
              v-model="protocolOutput"
              @input="update('output', $event)"
            >
              <option v-for="o in protocols" :key="o.name" :value="o.value">{{ o.name }}</option>
            </b-form-select>

            <b-form-input
              v-model="formStore.io.output"
              :state="Boolean(formStore.io.output)"
              placeholder="Example: output.mp4"
              @input="update('output', $event)"
            ></b-form-input>
          </b-input-group> -->
        </b-form-group>
      </b-col>
    </b-form-row>
  </div>
</template>

<script setup lang="ts">
import options from '@/libs/options'
import type { ProtocolNames } from '@/libs/options/types'
import useFormStore from '@/stores/form'
import { ref } from 'vue'

// const { protocols } = options

const formStore = useFormStore()
const protocolInputName = ref<ProtocolNames>('File')
const protocolOutputName = ref<ProtocolNames>('File')

// const $store = useCommonStore()

// const protocolInput = ref<string>('movie.mp4')
// const protocolOutput = ref<string>('movie.mp4')
// const showFileBrowser = ref<boolean>(false)

// const update = (key: keyof FormState['io'], value: string) => {
//   formStore.$patch((store) => {
//     store.io[key] = value
//   })
// }

// const onFileSelect = (file: string) => {
//   update('input', file)
//   showFileBrowser.value = false
// }

// const onFileFocus = () => {
//   showFileBrowser.value = true
// }

// const onClose = () => {
//   showFileBrowser.value = false
// }
</script>

<style scoped>
.protocol {
  flex: 0 0 20% !important;
}
</style>
