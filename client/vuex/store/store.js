import Vue from 'vue'
import Vuex from 'vuex'

import { rootMutations } from '../mutations/rootMutations'
import { userMutations } from '../mutations/userMutations'
import { teamMutations } from '../mutations/teamMutations'
import { playerMutations } from '../mutations/playerMutations'
import { competitionMutations } from '../mutations/competitionMutations'

import * as rootActions from '../actions/rootActions'
import * as userActions from '../actions/userActions'
import * as teamActions from '../actions/teamActions'
import * as playerActions from '../actions/playerActions'
import * as competitionActions from '../actions/competitionActions'

Vue.use(Vuex)

const state = {
  user: {},
  team: {},
  teams: [],
  myTeams: [],
  competitions: [],
  competition: {}
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
  competitions: state => {
    return state.competitions
  },
  competition: state => {
    return state.competition
  },
}

const actions = {
  ...rootActions,
  ...userActions,
  ...teamActions,
  ...playerActions,
  ...competitionActions,
}

const mutations = {
  ...rootMutations,
  ...userMutations,
  ...teamMutations,
  ...playerMutations,
  ...competitionMutations
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
