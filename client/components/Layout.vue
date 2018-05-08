<template>
  <v-content>
    <v-navigation-drawer
        clipped
        fixed
        v-model="drawer"
        app
      >
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
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
      <v-btn icon>
        <v-icon>account_circle</v-icon>
      </v-btn>
    </v-toolbar>
  </v-content>
</template>
<script>
  export default {
    name: "Layout",
    data: () => ({
      drawer: true
    })
  }
</script>
