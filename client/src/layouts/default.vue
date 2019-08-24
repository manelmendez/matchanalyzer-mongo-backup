<template>
  <v-content>
    <v-app-bar app fixed clipped-left :color="constants.theme2.PRIMARY_COLOR">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <router-link to='/' class="toolbar-title">
        <v-toolbar-title>MatchAnalyzer</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon dark>
            <v-icon>account_circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-title @click="logOut()" class="logout">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      width="200"
      app
    >
      <v-list dense>
        <v-list-item @click="goTo('teams')">
          <v-list-item-action>
            <v-icon>fas fa-futbol</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Mis equipos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="goTo('competitions')">
          <v-list-item-action>
            <v-icon>fas fa-trophy</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Mis competicones</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
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
        this.$router.push('/login')
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

