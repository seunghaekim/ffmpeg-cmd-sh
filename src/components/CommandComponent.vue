<template>
  <div class="command">
    <!-- Render each command fragment with a popover -->
    <code class="command-box">
      <CommandFragment
        v-for="(o, i) in renderCmd"
        :key="`fragment-${i}`"
        :index="i"
        :value="o.value"
        :filters="o.filters"
      />
    </code>

    <b-popover
      class="tips"
      :target="`popover-target-${i}`"
      triggers="hover"
      v-for="(o, i) in renderCmd"
      :key="`popover-${i}`"
      :disabled="!o.description"
      placement="top"
      variant="warning"
    >
      <template v-slot:title>{{ o.value }}</template>
      <span v-html="o.description"></span>
    </b-popover>
  </div>
</template>

<script setup lang="ts">
import tooltips from '@/libs/tooltips'
import CommandFragment from './CommandFragment.vue'

import { computed } from 'vue'
import useFormStore from '@/stores/form'
import ffmpeg from '@/libs/ffmpeg'
import formAdapter from '@/libs/formAdapter'

const formStore = useFormStore()
const command = computed(() => {
  const options = formAdapter.ffmpegOptionsFromForm(formStore.$state)
  return ffmpeg.build(options)
})

const renderCmd = computed(() => {
  return getToolTips(command.value)
})

function getToolTips(commandsStr: string) {
  const cmd = commandsStr.split(' ')
  const output: Array<{
    value: string
    description?: string
    filters?: Array<{ value: string; description?: string }>
  }> = []
  let skip: number | undefined

  // Map tooltip descriptions for known options.
  cmd.forEach((el, i) => {
    if (skip === i) return

    const o: {
      value: string
      description?: string
      filters?: Array<{ value: string; description?: string }>
    } = {
      value: el,
    }
    const desc = tooltips.find((t) => t.value === el)
    if (desc) {
      o.description = desc.tip
    }

    // Get filter fragments.
    if (el === '-vf' || el === '-af') {
      const filtersOutput: Array<{ value: string; description?: string }> = []
      const filters = cmd[i + 1].split(',')
      filters.forEach((filter) => {
        const f: { value: string; description?: string } = {
          value: filter,
        }
        const filterDesc = tooltips.find((t) => filter.includes(t.value))
        if (filterDesc) {
          f.description = filterDesc.tip
        }
        filtersOutput.push(f)
      })
      o.filters = filtersOutput
      skip = i + 1
    }
    output.push(o)
  })
  return output
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;700&display=swap');

.command-box {
  background-color: #000;
  border: 1px solid #aaa;
  color: #fff;
  display: block;
  font-size: 1.2rem;
  font-weight: 700;
  font-family: 'Source Code Pro', monospace;
  margin-top: 10px;
  padding: 8px;
  overflow: visible;
}
</style>
