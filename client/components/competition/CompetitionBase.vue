<template>
  <v-container fluid>
    <v-tabs
    centered
    color="cyan"
    dark
    icons-and-text >
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab to="summary">
        Resumen
        <v-icon>far fa-chart-bar</v-icon>
      </v-tab>
      <v-tab to="results">
        Resultados
        <v-icon>fas fa-list</v-icon>
      </v-tab>
      <v-tab to="rankings">
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
  export default {
    name: "CompetitionBase",
    data: () => ({

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
