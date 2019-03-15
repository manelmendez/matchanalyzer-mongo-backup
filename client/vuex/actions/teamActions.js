import * as types from '../mutations/mutation-types'
import axios from 'axios'
import Vue from 'vue'
import moment from 'moment'

import constants from '../../assets/constants/constants'
import store from '../store/store'

// SETTING UP AXIOS IN VUEX
axios.create()
axios.defaults.baseURL = constants.LOCAL_ADDRESS
// add token to Auth header if onceLogged
if (JSON.parse(window.localStorage.getItem('authUser'))!= null)
{
  axios.defaults.headers.common['Authorization'] = 'Bearer '+JSON.parse(window.localStorage.getItem('authUser')).token
}

export const addTeam = ({commit}, body) => {
  console.log("ACTION -- addTeam")
  return axios.post('addTeam', body)
    .then(response => {
      console.log(response.data);
      if(response.status === 200) {
        commit(types.ADD_TEAM, response.data.team)
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