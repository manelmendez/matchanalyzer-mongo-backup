<template>
  <v-container fluid>
    <v-tabs
      centered
      background-color="primary darken-1"
      dark
      grow
      icons-and-text 
      color="white"
    >
      <v-tabs-slider color="secondary"></v-tabs-slider>
      <v-tab class="compTab" to="summary">
        Resumen
        <v-icon>mdi-chart-line</v-icon>
      </v-tab>
      <v-tab class="compTab" to="results">
        Resultados
        <v-icon>mdi-format-list-checkbox</v-icon>
      </v-tab>
      <v-tab class="compTab" to="rankings">
        Clasificación
        <v-icon>mdi-trophy-outline</v-icon>
      </v-tab>
    </v-tabs>
    <router-view></router-view>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import constants from '../../../assets/constants/constants'
  export default {
    name: "CompetitionBase",
    data: () => ({
      constants: constants,
    }),
    methods: {
      ...mapActions("competition",[
        'getCompetition',
      ])
    },
    computed: {
      ...mapGetters("competition",[
        'competition'
      ])
    },
    created() {
      //do something after creating vue instance
      this.getCompetition(this.$route.params.id)
    }
  }
</script>
<style>
.compTab:hover {
  color: rgb(255, 255, 255)
}
.nothing {
  color: #187388
}
</style>