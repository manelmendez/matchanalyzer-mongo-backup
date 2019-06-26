import * as types from './mutation-types'

export const rootMutations = {
  [types.INITIALIZE] (state) {
    const authUser = JSON.parse(window.localStorage.getItem('authUser'))
    if (authUser) {
      state.user = authUser
    }
  },
  [types.SNACKBAR] (state, snackbar) {
    state.snackbar = snackbar
    setTimeout(() => {
      let snackoff ={
        color : "",
        text : "", 
        show : false
      }
      state.snackbar = snackoff
    }, 4000);
  }
}
