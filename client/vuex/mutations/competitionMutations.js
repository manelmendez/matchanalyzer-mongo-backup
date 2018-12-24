import * as types from './mutation-types'

export const competitionMutations = {
  [types.ADD_COMPETITION] (state, competition) {
    state.competitions = [...state.competitions, competition]
  },

  [types.GET_COMPETITION] (state, competition) {
    state.competition = competition
  },

  [types.GET_COMPETITIONS] (state, competitions) {
    state.competitions = competitions
  },
}
