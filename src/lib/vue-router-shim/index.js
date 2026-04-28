// Minimal vue-router shim to satisfy `import { createRouter, createWebHistory, useRoute } from 'vue-router'`
// This is only intended to allow the app to build/run during local development when the
// real package isn't installed. Install `vue-router` for full routing features.

import { h } from 'vue'

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

        // Register simple RouterLink and RouterView components so
        // templates using them don't throw at runtime when the real
        // `vue-router` package isn't installed.
        app.component('RouterLink', RouterLink)
        app.component('RouterView', RouterView)
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

// Minimal RouterLink component: renders an <a> with `href` from `to` and
// renders default slot. This is intentionally minimal for the shim.
export const RouterLink = {
  name: 'RouterLink',
  props: {
    to: { type: [String, Object], required: true },
  },
  setup(props, { slots }) {
    return () => {
      const href = typeof props.to === 'string' ? props.to : props.to && props.to.path ? props.to.path : '#'
      return h('a', { href }, slots.default ? slots.default() : '')
    }
  },
}

// Minimal RouterView: render default slot if provided.
export const RouterView = {
  name: 'RouterView',
  setup(_, { slots }) {
    return () => (slots.default ? slots.default() : null)
  },
}

export default {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  useRoute,
}
