import formAdapter from '@/libs/formAdapter'
import util from '@/libs/util'
import type { Form } from '@/types/form'
import { defineStore, type _GettersTree } from 'pinia'

type FormState = Form

interface FormGetters extends _GettersTree<FormState> {
  jsonString: (state: FormState) => string
}

export const defaultState: FormState = {
  io: {
    input: 'input.mp4',
    output: 'output.mp4',
  },
  format: {
    container: 'mp4',
    clip: false,
    startTime: null,
    stopTime: null,
  },
  video: {
    codec: 'x264',
    preset: 'none',
    pass: '1',
    crf: 23,
    bitrate: null,
    minrate: null,
    maxrate: null,
    bufsize: null,
    gopsize: null,
    pixel_format: 'auto',
    frame_rate: 'auto',
    speed: 'auto',
    tune: 'none',
    profile: 'none',
    level: 'none',
    faststart: false,
    size: 'source',
    width: '1080',
    height: '1920',
    format: 'widescreen',
    aspect: 'auto',
    scaling: 'auto',
    codec_options: '',
  },
  audio: {
    codec: 'copy',
    channel: 'source',
    quality: 'auto',
    sampleRate: 'auto',
    volume: 100,
  },
  filters: {
    deband: false,
    deshake: false,
    deflicker: false,
    dejudder: false,
    denoise: 'none',
    deinterlace: 'none',
    brightness: 0,
    contrast: 0,
    saturation: 0,
    gamma: 0,
    acontrast: 33,
  },
  options: {
    extra: [],
    loglevel: 'none',
  },
}

const useFormStore = defineStore<'form', FormState, FormGetters /*FormGetters, FormActions*/>(
  'form',
  {
    state: () => defaultState,
    getters: {
      jsonString(state) {
        const converted = formAdapter.utilOptionsFromForm(state)
        const json = util.transformToJSON(converted)
        const jsonStr = JSON.stringify(
          json,
          (k, v) => {
            if (v === null) return undefined
            return v
          },
          2,
        )
        return jsonStr
      },
    },
  },
)

export default useFormStore
