import { defineStore } from 'pinia'

const useControlStore = defineStore('control', {
  state: () => ({
    wsConnected: false,
    isEncoding: false,
    ffmpegEnabled: false,

    showJson: false,
  }),

  actions: {
    setWsAction(newValue: boolean) {
      this.wsConnected = newValue
    },

    setIsEncoding(newValue: boolean) {
      this.isEncoding = newValue
    },
    setFfmpegEnabled(newValue: boolean) {
      this.ffmpegEnabled = newValue
    },
  },
})

export default useControlStore
