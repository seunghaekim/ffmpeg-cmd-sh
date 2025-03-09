import { defineStore } from 'pinia'

const useControlStore = defineStore('control', {
  state: () => ({
    wsConnected: false,
    isEncoding: false,
    wasmEnabled: false,

    showJson: false,
  }),

  actions: {
    setWsAction(newValue: boolean) {
      this.wsConnected = newValue
    },

    setIsEncoding(newValue: boolean) {
      this.isEncoding = newValue
    },
    setwasmEnabled(newValue: boolean) {
      this.wasmEnabled = newValue
    },
  },
})

export default useControlStore
