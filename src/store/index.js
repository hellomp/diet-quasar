import Vue from 'vue'
import Vuex from 'vuex'

// Vuex store modules
import composition from './composition'
import diets from './diets'
import app from './app'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      composition,
      diets,
      app
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
