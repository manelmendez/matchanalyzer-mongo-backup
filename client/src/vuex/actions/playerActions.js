import * as types from '../mutations/mutation-types'
import axios from 'axios'
import Vue from 'vue'
import moment from 'moment'

import constants from '../../assets/constants/constants'
import store from '../store/store'

// SETTING UP AXIOS IN VUEX
axios.create()
axios.defaults.baseURL = constants.LOCAL_API_ADDRESS
// add token to Auth header if onceLogged
if (JSON.parse(window.localStorage.getItem('authUser'))!= null)
{
  axios.defaults.headers.common['Authorization'] = 'Bearer '+JSON.parse(window.localStorage.getItem('authUser')).token
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