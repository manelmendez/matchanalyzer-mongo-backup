<template>
  <v-content>
    <v-app-bar app fixed flat clipped-left collapse-on-scroll color="primary darken-1">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title @click="changeTheme">MatchAnalyzer</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            dark
            v-on="on"
            icon
          >
            <v-icon>palette</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in themes"
            :key="index"
            @click="selectTheme(item)"
          >
            <v-row justify="center">
              <v-avatar :color="item.value.primary" size="36">
              </v-avatar>
            </v-row>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu open-on-hover offset-y id="user">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon dark class="mr-5">
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
      expand-on-hover
      v-model="drawer"
      width="200"
      app
    >
      <v-list dense>
        <v-list-item to='/'>
          <v-list-item-action>
            <v-icon>mdi-home-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to='/teams'>
          <v-list-item-action>
            <v-icon>mdi-soccer</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Mis equipos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to='/competitions'>
          <v-list-item-action>
            <v-icon>mdi-trophy-outline</v-icon>
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
import red from '../assets/themes/red'
import green from '../assets/themes/green'
import deepPurple from '../assets/themes/deep-purple'
import lightBlue from '../assets/themes/light-blue'
import indigo from '../assets/themes/indigo'
import teal from '../assets/themes/teal'
import constants from '../assets/constants/constants'
  export default {
    name: "Layout",
    data: () => ({
      constants: constants,
      drawer: true,
      items: [
        { title: 'Sign Out' },
      ],
      themes: [
        {name:'green', value: green},
        {name:'red', value: red}, 
        {name:'lightBlue', value: lightBlue},  
        {name:'teal', value: teal}, 
        {name:'deepPurple', value: deepPurple}, 
        {name:'indigo', value: indigo}, 
      ]
    }),
    methods: {
      logOut() {
        window.localStorage.removeItem('authUser')
        this.signOut()
        let snackbar={show:true, color:"success", text:"Sesión cerrada"}
        this.$store.commit('root/SNACKBAR', snackbar)
        this.$router.push('/login')
      },
      ...mapActions("user",[
        'signOut',
      ]),
      changeTheme() {
        var randomTheme = this.themes[Math.floor(Math.random() * this.themes.length)];
        window.localStorage.setItem('theme', randomTheme.name)
        this.$vuetify.theme.themes.dark= randomTheme.value
      },
      selectTheme(theme) {
        window.localStorage.setItem('theme', theme.name)
        this.$vuetify.theme.themes.dark= theme.value
      }
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

