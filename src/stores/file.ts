import { defineStore, type _GettersTree } from 'pinia'

interface FileValue extends File {
  url: string
}

export interface FileState {
  files?: FileValue[]
}

interface FileGetters extends _GettersTree<FileState> {
  hasFiles: (state: FileState) => boolean
}

const useFileStore = defineStore<'file', FileState, FileGetters>('file', {
  state: () => ({
    files: undefined,
  }),
  getters: {
    hasFiles() {
      return this.files !== undefined && this.files.length > 0
    },
  },
})

export default useFileStore
