import { playerMutations } from '../mutations/playerMutations'
import * as playerActions from '../actions/playerActions'

export const playerModule = {
  namespaced: true,
  mutations: {
    ...playerMutations
  },
  actions: {
    ...playerActions
  }
}
