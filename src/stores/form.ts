import ffmpeg from '@/libs/ffmpeg'
import util from '@/libs/util'
import type { IFFMpegOptionsForm } from '@/types'
import type { Form } from '@/types/form'
import cloneDeep from 'lodash.clonedeep'
import { defineStore, type _GettersTree } from 'pinia'

function isNotEmptyNumber(value: number | undefined | null): value is NonNullable<number> {
  return !(value === null || value === undefined)
}

type FormState = Form

interface FormGetters extends _GettersTree<FormState> {
  transformParams(state: FormState): IFFMpegOptionsForm
  opt(state: FormState): ReturnType<typeof util.transform>
  command(state: FormState): string
  queryParams(state: FormState): ReturnType<typeof util.transformToQueryParams>
  transformToJson(state: FormState): ReturnType<typeof util.transformToJSON>
}

interface FormActions {
  fromQueryParams(query: { [key: string]: string }): void
}

const useFormStore = defineStore<'form', FormState, FormGetters, FormActions>('form', {
  state: () => ({
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
  }),

  getters: {
    transformParams(state) {
      return {
        ...state,
        filters: {
          ...state.filters,
          brightness: isNotEmptyNumber(state.filters.brightness)
            ? state.filters.brightness.toString()
            : '',
          contrast: isNotEmptyNumber(state.filters.contrast)
            ? state.filters.contrast.toString()
            : '',
          saturation: isNotEmptyNumber(state.filters.saturation)
            ? state.filters.saturation.toString()
            : '',
          gamma: isNotEmptyNumber(state.filters.gamma) ? state.filters.gamma.toString() : '',
          acontrast: isNotEmptyNumber(state.filters.acontrast)
            ? state.filters.acontrast.toString()
            : '',
        },
        audio: {
          ...state.audio,
          bitrate: isNotEmptyNumber(state.audio.bitrate) ? state.audio.bitrate.toString() : '',
          volume: isNotEmptyNumber(state.audio.volume) ? state.audio.volume.toString() : '',
        },
        video: {
          ...state.video,
          bitrate: isNotEmptyNumber(state.video.bitrate) ? state.video.bitrate.toString() : '',
          minrate: isNotEmptyNumber(state.video.minrate) ? state.video.minrate.toString() : '',
          maxrate: isNotEmptyNumber(state.video.maxrate) ? state.video.maxrate.toString() : '',
          bufsize: isNotEmptyNumber(state.video.bufsize) ? state.video.bufsize.toString() : '',
          gopsize: isNotEmptyNumber(state.video.gopsize) ? state.video.gopsize.toString() : '',
          crf: isNotEmptyNumber(state.video.crf) ? state.video.crf.toString() : '',
        },
        format: {
          ...state.format,
          startTime: state.format.startTime ?? '',
          stopTime: state.format.stopTime ?? '',
        },
        options: {
          ...state.options,
          extra: state.options.extra.join(','),
        },
      }
    },
    opt() {
      try {
        return util.transform(this.transformParams)
      } catch (e) {
        console.error({ e })
        throw e
      }
    },
    command() {
      return ffmpeg.build(this.opt)
    },
    queryParams() {
      return util.transformToQueryParams(this.transformParams)
    },
    transformToJson() {
      return util.transformToJSON(this.transformParams)
    },
  },
  actions: {
    fromQueryParams(query: { [key: string]: string }) {
      const params = cloneDeep(this.transformParams)
      const transfomed = util.transformFromQueryParams(params, query)

      this.$patch((state) => {
        Object.assign(state, transfomed)
      })
    },
  },
})

export default useFormStore
