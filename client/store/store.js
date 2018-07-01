import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from '../mutations/mutations'
import * as actions from '../actions/actions'

Vue.use(Vuex)

const state = {
  user:{},
  team: {},
  teams: []
}

const getters = {
  isLogged: state => {
    return state.user.isLogged
  },
  teams: state => {
    return state.teams
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
