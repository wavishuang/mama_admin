import { defineStore } from 'pinia'

export const useStoreUtils = defineStore('storeUtils', {
  state: () => {
    return {
      loading: false
    }
  },
  actions: {
    setLoading(stat, second=0) {
      this.loading = stat
      if(stat && second !== 0) {
        setTimeout(() => this.loading = false, second*1000)
      }
    },
  },
})