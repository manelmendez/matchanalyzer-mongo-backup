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

  [types.ADD_ROUND] (state, round) {
    state.competition.rounds = [...state.competition.rounds, round]
  },

  [types.ADD_MATCH] (state, match) {
    for (var i = 0; i < state.competition.rounds.length; i++) {
      if (state.competition.rounds[i]._id == match.round) {
        state.competition.rounds[i].matches = [...state.competition.rounds[i].matches, match]
      }
    }
  },

  [types.CHANGE_ROUND] (state, round) {
    state.selectedRound = Number(round)
  },

  [types.UPDATE_MATCH] (state, match) {
    // for (var i = 0; i < state.competition.rounds.length; i++) {
    //   if (state.competition.rounds[i]._id == match.round) {
    //     state.competition.rounds[i].matches = [...state.competition.rounds[i].matches, match]
    //   }
    // }
  },
  [types.DELETE_MATCH] (state, match) {

  },

  [types.DELETE_ROUND] (state, match) {

  },
}
