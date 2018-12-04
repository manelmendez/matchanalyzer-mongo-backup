import * as types from './mutation-types'

export const mutations = {
  [types.INITIALIZE] (state) {
    const authUser = JSON.parse(window.localStorage.getItem('authUser'))
    if (authUser) {
      state.user = authUser
    }
  },

  [types.SIGN_IN] (state, user_payload) {
    state.user = {...user_payload}
  },

  [types.SIGN_OUT] (state) {
    state.user = {
      isLogged: false
    }
  },

  [types.ADD_TEAM] (state, team) {
    state.teams = [...state.teams, team]
  },

  [types.GET_TEAM] (state, team) {
    state.team = team
  },

  [types.GET_TEAMS] (state, teams) {
    state.teams = teams
  },

  [types.GET_MYTEAMS] (state, teams) {
    state.myTeams = teams
  },

  [types.GET_TEAMPLAYERS] (state, players) {
    state.team.players = players
  },

  [types.ADD_PLAYER] (state, player) {
    state.team.players = [...state.team.players, player]
  },
}
