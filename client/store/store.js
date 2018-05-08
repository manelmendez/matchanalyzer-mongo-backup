import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from '../mutations/mutations'
import * as actions from '../actions/actions'

Vue.use(Vuex)

const state = {
  isLogged: true
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})