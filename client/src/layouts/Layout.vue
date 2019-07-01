<template>
  <v-content>
    <v-toolbar app fixed clipped-left :color="constants.theme2.PRIMARY_COLOR">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <router-link to='/' class="toolbar-title">
        <v-toolbar-title>MatchAnalyzer</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-menu open-on-hover offset-y>
        <v-btn slot="activator" icon dark>
          <v-icon>account_circle</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="(item, i) in items" :key="i">
            <v-list-tile-title @click="logOut()" class="logout">{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-navigation-drawer
        clipped
        fixed
        v-model="drawer"
        width="200"
        app
      >
      <v-list dense>
        <v-list-tile @click="goTo('teams')">
          <v-list-tile-action>
            <v-icon>fas fa-futbol</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Mis equipos</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="goTo('competitions')">
          <v-list-tile-action>
            <v-icon>fas fa-trophy</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Mis competicones</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <router-view></router-view>
  </v-content>
</template>
<script>
import { mapActions } from 'vuex'
import constants from '../assets/constants/constants'
  export default {
    name: "Layout",
    data: () => ({
      constants: constants,
      drawer: true,
      items: [
        { title: 'Sign Out' },
      ]
    }),
    methods: {
      goTo(page) {
        this.$router.push({
          name: page
        })
      },
      logOut() {
        window.localStorage.removeItem('authUser')
        this.signOut()
        let snackbar={show:true, color:"success", text:"Sesión cerrada"}
        this.$store.commit('SNACKBAR', snackbar)
        this.$router.push('/')
      },
      ...mapActions([
        'signOut',
      ])
    }
  }
</script>
<style scoped>
.toolbar-title {
  color: inherit;
  text-decoration: inherit;
}
.logout{
  cursor: pointer;
}
</style>

