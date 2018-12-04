import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from '../mutations/mutations'
import * as actions from '../actions/actions'

Vue.use(Vuex)

// const userModule = {
//   state: { ... },
//   mutations: { ... },
//   actions: { ... },
//   getters: { ... }
// }
//
// const teamModule = {
//   state: {},
//   mutations: { ... },
//   actions: { ... },
//   getters: { ... }
// }
//
// const playerModule = {
//   state: { ... },
//   mutations: { ... },
//   actions: { ... },
//   getters: { ... }
// }
//
// const competitionModule = {
//   state: { ... },
//   mutations: { ... },
//   actions: { ... },
//   getters: { ... }
// }
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
