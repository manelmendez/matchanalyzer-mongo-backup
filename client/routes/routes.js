import Vue from 'vue'
import Welcome from '../components/Welcome.vue'
import Teams from '../components/Teams.vue'
import MyTeam from '../components/MyTeam.vue'
import Dashboards from '../components/Dashboards.vue'
import Settings from '../components/Settings.vue'
import CompeticionBase from '../components/competicion/CompeticionBase.vue'
import CompeticionEquipos from '../components/competicion/CompeticionEquipos.vue'
import CompeticionResultados from '../components/competicion/CompeticionResultados.vue'
import CompeticionClasificacion from '../components/competicion/CompeticionClasificacion.vue'

import constants from '../assets/constants/constants'

import VueRouter from 'vue-router'
import axios from 'axios'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'Welcome',
    //   component: Welcome,
    //   meta: { onceLogged: true }
    // },
    {
      path: '/teams',
      name: 'Teams',
      component: Teams,
      meta: { requiresAuth: true }
    },
    {
      path: '/teams/:id',
      name: 'MyTeam',
      component: MyTeam,
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
    },
    {
      path: '/competition',
      component: CompeticionBase,
      meta: { requiresAuth: true },
      props: true,
      children: [
        {
          path: '',
          name: 'CompeticionBase',
          props: true,
          meta: { requiresAuth: true }
        },
        {
          path: ':id/teams',
          name: 'CompeticionEquipos',
          component: CompeticionEquipos,
          meta: { requiresAuth: true }
        },
        {
          path: ':id/results',
          name: 'CompeticionResultados',
          component: CompeticionResultados,
          meta: { requiresAuth: true }
        },
        {
          path: ':id/ranking',
          name: 'CompeticionClasificacion',
          component: CompeticionClasificacion,
          meta: { requiresAuth: true }
        }
      ]
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
    console.log("Requires Auth");
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
      console.log("Logged")
      next({name:'Teams'})
    }
    else {
      console.log("Not Logged")
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
