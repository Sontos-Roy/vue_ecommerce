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
