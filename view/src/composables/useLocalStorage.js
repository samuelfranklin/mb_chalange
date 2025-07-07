import { reactive, watch } from 'vue'

export const useStore = () => ({
  storeName: null,
  store: null,
  defineStore(name, data, options = {}) {
    const { keep = true } = options
    this.storeName = name
    retrieve()

    watch(
      () => this.store,
      () => {
        persist()
      },
      { deep: true, immediate: true },
    )

    function retrieve() {
      const storedData = window.localStorage.getItem(this.storeName)
      if (storedData) {
        this.store = reactive(JSON.parse(storedData))
      } else {
        this.store = reactive(data)
        persist()
      }
    }
    function persist() {
      if (keep) window.localStorage.setItem(this.storeName, JSON.stringify(this.store))
    }

    return this.store
  },
})
