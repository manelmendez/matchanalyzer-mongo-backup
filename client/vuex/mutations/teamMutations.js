import * as types from './mutation-types'

export const teamMutations = {
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
  }
}
