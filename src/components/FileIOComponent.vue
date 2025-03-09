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
              @focus="
                () => {
                  showFileBrowser = true
                }
              "
              @change="
                (value: string) => {
                  formStore.$patch((store) => {
                    store.io.input = value
                  })
                }
              "
            />
            <div v-if="showFileBrowser">
              <FileBrowserComponent
                v-on:file="
                  (filename: string) => {
                    formStore.$patch((store) => {
                      store.io.input = filename
                    })

                    showFileBrowser = false
                  }
                "
                v-on:close="
                  () => {
                    showFileBrowser = false
                  }
                "
              />
            </div>
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
import FileBrowserComponent from './FileBrowserComponent.vue'

const formStore = useFormStore()
const protocolInputName = ref<ProtocolNames>('File')
const protocolOutputName = ref<ProtocolNames>('File')

const showFileBrowser = ref<boolean>(false)
</script>

<style scoped>
.protocol {
  flex: 0 0 20% !important;
}
</style>
