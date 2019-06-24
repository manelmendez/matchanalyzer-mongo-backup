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

  [types.ADD_MYTEAM] (state, team) {
    state.myTeams = [...state.myTeams, team]
  },

  [types.GET_MYTEAMS] (state, teams) {
    state.myTeams = teams
  },

  [types.ADD_TEAM_TO_COMPETITION] (state, team) {
    state.competition.teams = [...state.competition.teams, team]
  },

  [types.UPDATE_TEAM] (state, team) {
  },
}
