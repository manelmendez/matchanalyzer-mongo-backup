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

  [types.ADD_MATCH] (state, data) {    
    for (var i = 0; i < state.competition.rounds.length; i++) {      
      if (state.competition.rounds[i]._id == data.match.round) {
        state.competition.rounds[i].matches = [...state.competition.rounds[i].matches, data.match]
      }
    }
    for (let x = 0; x < state.competition.teams.length; x++) {
      if (state.competition.teams[x]._id == data.match.localTeam._id) {
        state.competition.teams[x].stats = [...state.competition.teams[x].stats, data.localTeamStats]        
      }
      else if (state.competition.teams[x]._id == data.match.awayTeam._id) {
        state.competition.teams[x].stats = [...state.competition.teams[x].stats, data.awayTeamStats]
      }
    }
  },

  [types.CHANGE_ROUND] (state, round) {
    state.selectedRound = Number(round)
  },

  [types.UPDATE_MATCH] (state, data) {
    let updatedMatch = data.match
    let updatedLocalStats = data.localTeamStats
    let updatedAwayStats = data.awayTeamStats
    console.log(updatedMatch);
    let round = null
    let match = null
    for (var i = 0; i < state.competition.rounds.length; i++) {
      if (state.competition.rounds[i]._id == updatedMatch.round) {  
        round = i      
        for (let j = 0; j < state.competition.rounds[i].matches.length; j++) {
          if (state.competition.rounds[i].matches[j]._id == updatedMatch._id) {
            // EN PRINCIPIO EL INDEXOF() ES LO MISMO QUE LA J
            // let index = state.competition.rounds[i].matches.indexOf(state.competition.rounds[i].matches[j])   
            match = j         
            state.competition.rounds[i].matches[j] = updatedMatch            
          }
        }
      }
    }    
    for (let x = 0; x < state.competition.teams.length; x++) {  
          
      if (state.competition.teams[x]._id == state.competition.rounds[round].matches[match].localTeam._id) {
        for (let y = 0; y < state.competition.teams[x].stats.length; y++) {

          if (state.competition.teams[x].stats[y]._id == updatedLocalStats._id) {
            state.competition.teams[x].stats[y] = updatedLocalStats
          }
        }
      }     
      else if (state.competition.teams[x]._id == state.competition.rounds[round].matches[match].awayTeam._id) {
        for (let z = 0; z < state.competition.teams[x].stats.length; z++) {  
          if (state.competition.teams[x].stats[z]._id == updatedAwayStats._id) {
            state.competition.teams[x].stats[z] = updatedAwayStats
          }
        }
      } 
    }    
  },
  [types.DELETE_MATCH] (state, match) {

  },

  [types.DELETE_ROUND] (state, match) {

  },
}
