import * as types from '../mutations/mutation-types'
import axios from 'axios'

export const addTeam = ({commit}, body) => {
  console.log("ACTION -- addTeam")
  return axios.post('addTeam', body)
    .then(response => {
      console.log(response.data);
      if(response.status === 200) {
        commit(types.ADD_MYTEAM, response.data.team)
      }
      return response
    })
    .catch((err) => {
      return err.response
    })
}
export const getTeam = ({commit}, id) => {
  console.log("ACTION -- getTeam")
  return axios.get('getTeam/'+id)
    .then(response => {
      let team = response.data.team
      commit(types.GET_TEAM, team)
    })
}
export const getAllTeams = ({commit}) => {
  console.log("ACTION -- getAllTeams")
  return axios.get('getAllTeams')
    .then(response => {
      let teams = response.data.teams
      commit(types.GET_TEAMS, teams)
    })
}

export const getUserTeams = ({commit}, userId) => {
  console.log("ACTION -- getUserTeams")
  return axios.get('getUserTeams/'+userId)
    .then(response => {
      let teams = response.data.teams
      commit(types.GET_MYTEAMS, teams)
    })
}

export const addNoManagerTeam = ({commit}, body) => {
  console.log("ACTION -- addNoManagerTeam")
  return axios.post('addNoManagerTeam', body)
    .then(response => {
      console.log(response.data);
      if(response.status === 200) {
        commit(types.ADD_TEAM_TO_COMPETITION, response.data.team)
      }
      return response
    })
    .catch((err) => {
      return err.response
    })
}

export const uploadTeamImage = ({commit}, formData) => {
  console.log("ACTION -- uploadTeamImage")
  return axios.post('uploadImage', formData,{
    onUploadProgress: progressEvent => {
      console.log("Progress: "+Math.round(progressEvent.loaded / progressEvent.total*100)+ '%')
    }
  })
  .then(response => {
    return response
  })
  .catch((err) => {
    return err.response
  })
}

export const updateTeam = ({commit}, data) => {
  console.log("ACTION -- updateTeam")
  return axios.put('updateTeam/'+data.id, data.body).then(response => {
    if(response.status === 200) {
      commit(types.UPDATE_TEAM)//TODO de momento no se devuelve nada desde el servidor
    }
    return response
  }).catch((err) => {
    return err.response
  })
}

export const addPlayer = ({commit}, body) => {
  console.log("ACTION -- addPlayer")
  return axios.post('addPlayer', body)
    .then(response => {
      if(response.status === 200) {
        commit(types.ADD_PLAYER, response.data)
      }
      return response
    })
    .catch((err) => {
      return err.response
    })
}
export const getPlayerByTeamId = ({commit}, id) => {
  console.log("ACTION -- getPlayerByTeamId")
  return axios.get('getPlayerByTeamId/'+id)
    .then(response => {
      let players = response.data
      commit(types.GET_TEAMPLAYERS, players)
    })
}