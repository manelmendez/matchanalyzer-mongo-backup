import * as types from './mutation-types'

export const rootMutations = {
  [types.INITIALIZE] (state) {
    const authUser = JSON.parse(window.localStorage.getItem('authUser'))
    if (authUser) {
      state.user = authUser
    }
  }
}
