import * as types from '../mutations/mutation-types'
import axios from 'axios'

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