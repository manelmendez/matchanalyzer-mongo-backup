import Vue from 'vue'
import Welcome from '../components/Welcome.vue'
import Teams from '../components/Teams.vue'
import Players from '../components/Players.vue'
import Dashboards from '../components/Dashboards.vue'
import Settings from '../components/Settings.vue'

import constants from '../assets/constants/constants'

import VueRouter from 'vue-router'
import axios from 'axios'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome,
      meta: { onceLogged: true }
    },
    {
      path: '/teams',
      name: 'Teams',
      component: Teams,
      meta: { requiresAuth: true }
    },
    {
      path: '/players',
      name: 'Players',
      component: Players,
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboards',
      name: 'Dashboards',
      component: Dashboards,
      meta: { requiresAuth: true }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: { requiresAuth: true }
    }
  ]
})
/**
 * Function to check some things before redirect to a page
 *
 */
router.beforeEach((to, from, next) => {
  // method to check if user needs to be logged to access a page
  if(to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('authUser'))
    if(!authUser) {
      next({name:'Welcome'})
    }
    else {
      isAuth()
      next()
    }
  }
  // method to not allow a user to go to certain pages once logged
  else if (to.meta.onceLogged) {
    const authUser = JSON.parse(window.localStorage.getItem('authUser'))
    if(authUser) {
      next({name:'Teams'})
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})
function isAuth() {
  axios.post(constants.LOCAL_ADDRESS+'private', null)
  .then(response => {
    if(response.status === 200) {
      console.log("Autorizado")
    }
  })
  .catch(error => {
    console.log(error);
    if (error.response.status === 403) {
      console.log("No estás autorizado");
    }
    else if (error.response.status === 401) {
      console.log("No estás autorizado");
    }
    else if (error.response.status === 500) {
      console.log("No estás autorizado");
    }
    window.localStorage.removeItem('authUser')
    router.push({ path: "/" })
  })
}
export default router
