import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from '../mutations/mutations'
import * as actions from '../actions/actions'

Vue.use(Vuex)

const state = {
  user: {},
  team: {},
  teams: [],
  myTeams: []
}

const getters = {
  user: state => {
    return state.user
  },
  team: state => {
    return state.team
  },
  isLogged: state => {
    return state.user.isLogged
  },
  teams: state => {
    return state.teams
  },
  myTeams: state => {
    return state.myTeams
  },
  teamPlayers: state => {
    return state.team.players
  },
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
