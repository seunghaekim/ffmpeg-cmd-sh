import { defineStore } from 'pinia'

const useCommonStore = defineStore('common', {
  state: () => ({
    wsConnected: false,
    isEncoding: false,
    ffmpegEnabled: false,
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

export default useCommonStore
