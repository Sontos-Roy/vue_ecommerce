// Minimal vue-router shim to satisfy `import { createRouter, createWebHistory, useRoute } from 'vue-router'`
// Provides very small client-side routing: route matching, `RouterLink` navigation
// without full page reloads, and a `RouterView` that renders matched components.

import { h, ref } from 'vue'

let _routes = []
const _currentPath = ref(typeof window !== 'undefined' ? window.location.pathname : '/')
let _currentParams = {}

function pathToRegex(path) {
  // convert '/product/:id' -> regex with capture for id
  const keys = []
  const pattern = path.replace(/:([^/]+)/g, (_, key) => {
    keys.push(key)
    return '([^/]+)'
  })
  const regex = new RegExp('^' + pattern + '$')
  return { regex, keys }
}

function matchRoute(pathname) {
  for (const r of _routes) {
    const { regex, keys } = pathToRegex(r.path)
    const m = pathname.match(regex)
    if (m) {
      const params = {}
      keys.forEach((k, i) => (params[k] = decodeURIComponent(m[i + 1])))
      return { route: r, params }
    }
  }
  return null
}

export function createRouter(options = {}) {
  const router = {
    _isMockRouter: true,
    options,
    install(app) {
      try {
        _routes = Array.isArray(options.routes) ? options.routes : []

        app.provide && app.provide('router', router)
        if (app.config && app.config.globalProperties) {
          app.config.globalProperties.$router = router
        }

        // register components that use module-level state
        app.component('RouterLink', RouterLink)
        app.component('RouterView', RouterView)

        // listen to browser navigation
        if (typeof window !== 'undefined') {
          window.addEventListener('popstate', () => {
            _currentPath.value = window.location.pathname
          })
        }
      } catch (e) {
        // noop
      }
    },
    push(to) {
      try {
        const href = typeof to === 'string' ? to : to && to.path ? to.path : '/'
        if (typeof window !== 'undefined') {
          window.history.pushState({}, '', href)
          _currentPath.value = window.location.pathname
        }
      } catch (e) {
        // noop
      }
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
  return { params: _currentParams }
}

// RouterLink: prevent full reloads and pushHistory
export const RouterLink = {
  name: 'RouterLink',
  props: {
    to: { type: [String, Object], required: true },
  },
  setup(props, { slots }) {
    const handleClick = (e) => {
      // allow modifiers (ctrl/meta) to open in new tab
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      e.preventDefault()
      const href = typeof props.to === 'string' ? props.to : props.to && props.to.path ? props.to.path : '#'
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', href)
        _currentPath.value = window.location.pathname
      }
    }

    return () => {
      const href = typeof props.to === 'string' ? props.to : props.to && props.to.path ? props.to.path : '#'
      return h('a', { href, onClick: handleClick }, slots.default ? slots.default() : '')
    }
  },
}

// RouterView: render the matched route's component
export const RouterView = {
  name: 'RouterView',
  setup(_, { slots }) {
    return () => {
      const match = matchRoute(_currentPath.value)
      if (!match) {
        // no match: render default slot or nothing
        return slots.default ? slots.default() : null
      }

      _currentParams = match.params || {}

      const Comp = match.route.component
      if (!Comp) return null

      // If component is an object (SFC) return h(Comp)
      return h(Comp)
    }
  },
}

export default {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  useRoute,
}
