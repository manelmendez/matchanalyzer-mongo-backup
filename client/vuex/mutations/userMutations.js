import * as types from './mutation-types'

export const userMutations = {
  [types.SIGN_IN] (state, user_payload) {
    state.user = {...user_payload}
  },

  [types.SIGN_OUT] (state) {
    state.user = {
      isLogged: false
    }
  }
}
