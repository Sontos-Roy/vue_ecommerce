// Minimal Pinia shim to satisfy `import { createPinia } from 'pinia'`
// This provides a tiny plugin-compatible object for development without installing the package.
export function createPinia() {
  const pinia = {
    _isMockPinia: true,
    // Vue plugin install hook
    install(app) {
      // provide a simple empty store container
      try {
        app.provide && app.provide('pinia', pinia)
        if (app.config && app.config.globalProperties) {
          app.config.globalProperties.$pinia = pinia
        }
      } catch (e) {
        // noop
      }
    },
  }
  return pinia
}

export default createPinia

// Minimal `defineStore` shim to support stores created with Pinia's API.
import { reactive } from 'vue'

export function defineStore(id, options) {
  let _store
  return function useStore() {
    if (_store) return _store

    const state = (typeof options.state === 'function') ? options.state() : (options.state || {})
    _store = reactive({ ...state })

    // attach getters as computed-like properties (simple, non-cached)
    if (options.getters) {
      Object.keys(options.getters).forEach((key) => {
        Object.defineProperty(_store, key, {
          get() {
            try {
              return options.getters[key].call(_store, _store)
            } catch (e) {
              return undefined
            }
          },
          enumerable: true,
        })
      })
    }

    // bind actions to the store
    if (options.actions) {
      Object.keys(options.actions).forEach((key) => {
        _store[key] = options.actions[key].bind(_store)
      })
    }

    return _store
  }
}
