import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _7c50cca8 = () => interopDefault(import('../pages/Forgot.vue' /* webpackChunkName: "pages/Forgot" */))
const _7c13af17 = () => interopDefault(import('../pages/How.vue' /* webpackChunkName: "pages/How" */))
const _2caf85f0 = () => interopDefault(import('../pages/Login.vue' /* webpackChunkName: "pages/Login" */))
const _5a393ad1 = () => interopDefault(import('../pages/manage/index.vue' /* webpackChunkName: "pages/manage/index" */))
const _2d19bc5d = () => interopDefault(import('../pages/results.vue' /* webpackChunkName: "pages/results" */))
const _94c9b5be = () => interopDefault(import('../pages/Signup.vue' /* webpackChunkName: "pages/Signup" */))
const _e91773a6 = () => interopDefault(import('../pages/manage/Create.vue' /* webpackChunkName: "pages/manage/Create" */))
const _8b5ba30a = () => interopDefault(import('../pages/manage/Edit.vue' /* webpackChunkName: "pages/manage/Edit" */))
const _fa8098d8 = () => interopDefault(import('../pages/manage/Settings.vue' /* webpackChunkName: "pages/manage/Settings" */))
const _19b92086 = () => interopDefault(import('../pages/manage/Tickets.vue' /* webpackChunkName: "pages/manage/Tickets" */))
const _10cc4572 = () => interopDefault(import('../pages/manage/event/_id/index.vue' /* webpackChunkName: "pages/manage/event/_id/index" */))
const _fac43070 = () => interopDefault(import('../pages/manage/website/_id/index.vue' /* webpackChunkName: "pages/manage/website/_id/index" */))
const _88b4f930 = () => interopDefault(import('../pages/manage/event/_id/Activities.vue' /* webpackChunkName: "pages/manage/event/_id/Activities" */))
const _09b86545 = () => interopDefault(import('../pages/manage/event/_id/Edit.vue' /* webpackChunkName: "pages/manage/event/_id/Edit" */))
const _40e1d5b4 = () => interopDefault(import('../pages/manage/event/_id/Share.vue' /* webpackChunkName: "pages/manage/event/_id/Share" */))
const _086ed395 = () => interopDefault(import('../pages/manage/event/_id/Successful.vue' /* webpackChunkName: "pages/manage/event/_id/Successful" */))
const _75d196f2 = () => interopDefault(import('../pages/manage/event/_id/Ticket.vue' /* webpackChunkName: "pages/manage/event/_id/Ticket" */))
const _48a8536f = () => interopDefault(import('../pages/event/_id/index.vue' /* webpackChunkName: "pages/event/_id/index" */))
const _28d47a0e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'

    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })
  }
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: decodeURI('/'),
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/Forgot",
      component: _7c50cca8,
      name: "Forgot"
    }, {
      path: "/How",
      component: _7c13af17,
      name: "How"
    }, {
      path: "/Login",
      component: _2caf85f0,
      name: "Login"
    }, {
      path: "/manage",
      component: _5a393ad1,
      name: "manage"
    }, {
      path: "/results",
      component: _2d19bc5d,
      name: "results"
    }, {
      path: "/Signup",
      component: _94c9b5be,
      name: "Signup"
    }, {
      path: "/manage/Create",
      component: _e91773a6,
      name: "manage-Create"
    }, {
      path: "/manage/Edit",
      component: _8b5ba30a,
      name: "manage-Edit"
    }, {
      path: "/manage/Settings",
      component: _fa8098d8,
      name: "manage-Settings"
    }, {
      path: "/manage/Tickets",
      component: _19b92086,
      name: "manage-Tickets"
    }, {
      path: "/manage/event/:id?",
      component: _10cc4572,
      name: "manage-event-id"
    }, {
      path: "/manage/website/:id?",
      component: _fac43070,
      name: "manage-website-id"
    }, {
      path: "/manage/event/:id?/Activities",
      component: _88b4f930,
      name: "manage-event-id-Activities"
    }, {
      path: "/manage/event/:id?/Edit",
      component: _09b86545,
      name: "manage-event-id-Edit"
    }, {
      path: "/manage/event/:id?/Share",
      component: _40e1d5b4,
      name: "manage-event-id-Share"
    }, {
      path: "/manage/event/:id?/Successful",
      component: _086ed395,
      name: "manage-event-id-Successful"
    }, {
      path: "/manage/event/:id?/Ticket",
      component: _75d196f2,
      name: "manage-event-id-Ticket"
    }, {
      path: "/event/:id?",
      component: _48a8536f,
      name: "event-id"
    }, {
      path: "/",
      component: _28d47a0e,
      name: "index"
    }],

    fallback: false
  })
}
