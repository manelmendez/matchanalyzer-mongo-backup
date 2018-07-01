import * as types from './mutation-types'

export const mutations = {
  [types.INITIALIZE] (state) {
    const authUser = JSON.parse(window.localStorage.getItem('authUser'))
    if (authUser) {
      state.user = authUser
    }
  },

  [types.SIGN_IN] (state, user_payload) {
    state.user = user_payload
  },

  [types.SIGN_OUT] (state) {
    state.user = {}
  },

  [types.ADD_TEAM] (state) {

  },

  [types.GET_TEAM] (state, team) {
    state.team = team
  },

  [types.GET_TEAMS] (state, teams) {
    state.teams = teams
  }
}
