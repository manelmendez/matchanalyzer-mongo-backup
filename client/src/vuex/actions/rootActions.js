import * as types from '../mutations/mutation-types'

export const initializeStore = ({commit}) => {
  console.log("ACTION -- initializeStore")
  commit(types.INITIALIZE)
}