import * as types from '../mutations/mutation-types'

export const signIn = ({commit}, token_payload) => {
  commit(types.SIGN_IN, token_payload)
}

export const signOut = ({commit}) => {
  commit(types.SIGN_OUT)
}