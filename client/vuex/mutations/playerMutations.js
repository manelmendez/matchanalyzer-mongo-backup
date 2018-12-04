import * as types from './mutation-types'

export const playerMutations = {
  [types.GET_TEAMPLAYERS] (state, players) {
    state.team.players = players
  },

  [types.ADD_PLAYER] (state, player) {
    state.team.players = [...state.team.players, player]
  },
}
