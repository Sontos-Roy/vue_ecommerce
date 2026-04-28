// Minimal vue-router shim to satisfy `import { createRouter, createWebHistory, useRoute } from 'vue-router'`
// This is only intended to allow the app to build/run during local development when the
// real package isn't installed. Install `vue-router` for full routing features.

export function createRouter(options = {}) {
  const router = {
    _isMockRouter: true,
    options,
    install(app) {
      try {
        app.provide && app.provide('router', router)
        if (app.config && app.config.globalProperties) {
          app.config.globalProperties.$router = router
        }
      } catch (e) {
        // noop
      }
    },
    push() {
      // noop placeholder
    },
  }
  return router
}

export function createWebHistory() {
  return { _mock: 'history' }
}

export function createWebHashHistory() {
  return { _mock: 'hash-history' }
}

export function useRoute() {
  // Basic parser to extract a product id from a path like /product/123
  const params = {}
  try {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname || ''
      const m = path.match(/\/product\/([^\/]+)/)
      if (m) params.id = m[1]
    }
  } catch (e) {
    // noop
  }
  return { params }
}

export default {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  useRoute,
}
