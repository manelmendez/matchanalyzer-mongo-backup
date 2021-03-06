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
    state.selectedRound = Number(state.competition.rounds.length)
  },

  [types.ADD_MATCH] (state, data) {  
    data.match.localTeam.stats.push(data.localTeamStats)
    data.match.awayTeam.stats.push(data.awayTeamStats)
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
    // let updatedMatch = data.match
    // let updatedLocalStats = data.localTeamStats
    // let updatedAwayStats = data.awayTeamStats
    // console.log(updatedMatch);
    // let round = null
    // let match = null
    // for (let a = 0; a < data.match.localTeam.stats.length; a++) {
    //   if (data.match.localTeam.stats[a]._id == updatedLocalStats._id) {
    //     data.match.localTeam.stats[a] = updatedLocalStats
    //   }
    // }
    // for (let b = 0; b < data.match.awayTeam.stats.length; b++) {
    //   if (data.match.awayTeam.stats[b]._id == updatedAwayStats._id) {
    //     data.match.awayTeam.stats[b] = updatedAwayStats
    //   }
    // }
    // for (var i = 0; i < state.competition.rounds.length; i++) {
    //   if (state.competition.rounds[i]._id == updatedMatch.round) {  
    //     round = i      
    //     for (let j = 0; j < state.competition.rounds[i].matches.length; j++) {
    //       if (state.competition.rounds[i].matches[j]._id == updatedMatch._id) {
    //         // EN PRINCIPIO EL INDEXOF() ES LO MISMO QUE LA J
    //         let index = state.competition.rounds[i].matches.indexOf(state.competition.rounds[i].matches[j])   
    //         match = index         
    //         state.competition.rounds[i].matches[index] = updatedMatch            
    //       }
    //     }
    //   }
    // }    
    // for (let x = 0; x < state.competition.teams.length; x++) {  
    //   if (state.competition.teams[x]._id == state.competition.rounds[round].matches[match].localTeam._id) {
    //     for (let y = 0; y < state.competition.teams[x].stats.length; y++) {

    //       if (state.competition.teams[x].stats[y]._id == updatedLocalStats._id) {
    //         state.competition.teams[x].stats[y] = updatedLocalStats
    //       }
    //     }
    //   }     
    //   else if (state.competition.teams[x]._id == state.competition.rounds[round].matches[match].awayTeam._id) {
    //     for (let z = 0; z < state.competition.teams[x].stats.length; z++) {  
    //       if (state.competition.teams[x].stats[z]._id == updatedAwayStats._id) {
    //         state.competition.teams[x].stats[z] = updatedAwayStats
    //       }
    //     }
    //   } 
    // }
  },

  [types.ADD_TEAM_TO_COMPETITION] (state, team) {
    state.competition.teams = [...state.competition.teams, team]
  },

  [types.DELETE_MATCH] (state, data) {    
    //eliminar partido de la jornada
    for (let i = 0; i < state.competition.rounds.length; i++) {
      if (state.competition.rounds[i]._id == data.body.roundId) {
        for (let x = 0; x < state.competition.rounds[i].matches.length; x++) {
          if(state.competition.rounds[i].matches[x]._id == data.id){
            state.competition.rounds[i].matches.splice(x,1)
          }
        }
      }
    }
    //eliminar stats de ambos equipos
    for (let x = 0; x < state.competition.teams.length; x++) {  
      if (state.competition.teams[x]._id == data.body.localTeamId) {
        for (let y = 0; y < state.competition.teams[x].stats.length; y++) {
          if (state.competition.teams[x].stats[y]._id == data.body.localTeamStatsId) {
            state.competition.teams[x].stats.splice(y,1)
          }
        }
      }     
      else if (state.competition.teams[x]._id == data.body.awayTeamId) {
        for (let z = 0; z < state.competition.teams[x].stats.length; z++) {  
          if (state.competition.teams[x].stats[z]._id == data.body.awayTeamStatsId) {
            state.competition.teams[x].stats.splice(z,1)
          }
        }
      } 
    }    
  },

  [types.DELETE_ROUND] (state) {
    state.competition.rounds.pop()
    state.selectedRound = Number(state.competition.rounds.length)
  },

  [types.UPDATE_COMPETITION] (state, competition) {
    let previousCompetition = state.competitions.find(a => a._id === competition._id)    
    Object.assign(previousCompetition, competition)
  },
  [types.DELETE_COMPETITION] (state, competitionId) {
    let index = state.competitions.findIndex(item => item._id == competitionId)
    state.competitions.splice(index, 1)
  },
}
