import Vue from 'vue'
import Welcome from '../pages/Welcome.vue'
import MyTeams from '../pages/MyTeams.vue'
import MyTeam from '../pages/MyTeam.vue'
import CompetitionBase from '../pages/competition/CompetitionBase.vue'
import MyCompetitions from '../pages/MyCompetitions.vue'
import CompetitionSummary from '../pages/competition/CompetitionSummary.vue'
import CompetitionResults from '../pages/competition/CompetitionResults.vue'
import CompetitionClasification from '../pages/competition/CompetitionClasification.vue'
import TeamGlobal from '../pages/TeamGlobal.vue'

import constants from '../assets/constants/constants'

import VueRouter from 'vue-router'
import axios from 'axios'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect: '/teams',
    },
    {
      path: '/teams',
      name: 'MyTeams',
      component: MyTeams,
      meta: { requiresAuth: true }
    },
    {
      path: '/teams/:id',
      name: 'MyTeam',
      component: MyTeam,
      meta: { requiresAuth: true }
    },
    {
      path: '/competition',
      name: 'MyCompetitions',
      component: MyCompetitions,
      meta: { requiresAuth: true }
    },
    {
      path: '/competition/:id',
      component: CompetitionBase,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'summary',
          name: 'CompetitionBase',
          component: CompetitionSummary,
          meta: { requiresAuth: true }
        },
        {
          path: 'results',
          name: 'CompetitionResults',
          component: CompetitionResults,
          meta: { requiresAuth: true }
        },
        {
          path: 'rankings',
          name: 'CompetitionClasification',
          component: CompetitionClasification,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/teamGlobal/:id',
      name: 'TeamGlobal',
      component: TeamGlobal,
      meta: { requiresAuth: true }
    },
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
      next({name:'Index'})
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
      next({name:'MyTeams'})
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
  axios.post(constants.LOCAL_API_ADDRESS+'private', null)
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
