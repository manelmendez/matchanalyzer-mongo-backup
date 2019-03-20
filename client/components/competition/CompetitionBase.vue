<template>
  <v-container fluid>
    <v-tabs
    centered
    :color="constants.PRIMARY_DARK_COLOR_GREEN"
    dark
    icons-and-text >
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab class="compTab" to="summary">
        Resumen
        <v-icon>far fa-chart-bar</v-icon>
      </v-tab>
      <v-tab class="compTab" to="results">
        Resultados
        <v-icon>fas fa-list</v-icon>
      </v-tab>
      <v-tab class="compTab" to="rankings">
        Clasificación
        <v-icon>fas fa-trophy</v-icon>
      </v-tab>
    </v-tabs>
    <router-view></router-view>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import constants from '../../assets/constants/constants'
  export default {
    name: "CompetitionBase",
    data: () => ({
      constants: constants,
    }),
    methods: {
      goTo(id) {
        this.$router.push({
          name: "CompeticionEquipos",
          params: {
            id: id
          }
        })
      },
      ...mapActions([
        'getCompetition',
      ])
    },
    computed: {
      ...mapGetters([
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
.compTab:hover{
  color: rgb(255, 255, 255)
}
</style>