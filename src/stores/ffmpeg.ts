import { FFmpeg, type LogEvent } from '@ffmpeg/ffmpeg'
import { toBlobURL } from '@ffmpeg/util'
import { defineStore, type _ActionsTree, type _GettersTree } from 'pinia'

interface FFmpegState {
  ffmpeg: FFmpeg | null
  status: 'idle' | 'loading' | 'ready' | 'error'
  logs: LogEvent[]
}

interface FFmpegGetters extends _GettersTree<FFmpegState> {
  wasmEnabled: () => boolean
}

interface FFmpegActions extends _ActionsTree {
  initialize: () => Promise<void>
}

const baseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core-mt@0.12.9/dist/esm'

const useFFmpegStore = defineStore<'ffmpeg', FFmpegState, FFmpegGetters, FFmpegActions>('ffmpeg', {
  state: () => ({
    ffmpeg: null,
    status: 'idle',
    logs: [],
  }),
  getters: {
    wasmEnabled() {
      return this.status === 'ready'
    },
  },
  actions: {
    initialize: async function () {
      if (this.status === 'ready') return

      try {
        const ffmpeg = new FFmpeg()

        this.status = 'loading'

        ffmpeg.on('log', (log: LogEvent) => {
          this.logs.push(log)
        })

        await ffmpeg.load({
          coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
          wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
          workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript'),
        })

        this.ffmpeg = ffmpeg
        this.status = 'ready'
      } catch (e) {
        console.error(e)
        this.status = 'error'
      }
    },
  },
})

export default useFFmpegStore
