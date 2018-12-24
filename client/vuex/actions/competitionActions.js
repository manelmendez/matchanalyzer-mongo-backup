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

export const addCompetition = ({commit}, body) => {
  return axios.post('addCompetition', body)
    .then(response => {
      if(response.status === 200) {
        commit(types.ADD_COMPETITION, response.data.competition)
      }
      return response
    })
    .catch((err) => {
      return err.response
    })
}

export const getCompetition = ({commit}, id) => {
  return axios.get('getCompetition/'+id)
    .then(response => {
      let competition = response.data.competition
      commit(types.GET_COMPETITION, competition)
    })
}

export const getUserCompetitions = ({commit}, id) => {
  return axios.get('getUserCompetitions/'+id)
    .then(response => {
      let competitions = response.data.competitions
      commit(types.GET_COMPETITIONS, competitions)
    })
}