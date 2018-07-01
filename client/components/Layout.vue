<template>
  <v-content>
    <v-navigation-drawer
        clipped
        fixed
        v-model="drawer"
        app
      >
      <v-list dense>
        <v-list-tile @click="goTo('Teams')">
          <v-list-tile-action>
            <v-icon>fas fa-futbol</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Mis equipos</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="goTo('Players')">
          <v-list-tile-action>
            <i class="material-icons">directions_run</i>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Mis jugadores</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="goTo('Dashboards')">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="goTo('Settings')">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>MatchAnalyzer</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu open-on-hover offset-y>
        <v-btn slot="activator" icon dark>
          <v-icon>account_circle</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="(item, i) in items" :key="i" @click="">
            <v-list-tile-title @click="logOut()">{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
  </v-content>
</template>
<script>
import { mapActions } from 'vuex'
  export default {
    name: "Layout",
    data: () => ({
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
        this.$router.push('/')
      },
      ...mapActions([
        'signOut',
      ])
    }
  }
</script>
