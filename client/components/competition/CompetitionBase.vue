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

    <!-- <v-layout>
      <v-flex xs12 sm4 offset-sm3>
        <v-card v-for="team in this.competition.teams" :key="team._id">
          <v-img
            :src="team.avatar"
            aspect-ratio="2.75"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{team.name}}</h3>
              <div>Nº de jugadores: <br>{{team.players.length}}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-btn
      fab
      color="pink"
      dark
      bottom
      right
      fixed
    >
      <i class="material-icons">add</i>
    </v-btn> -->
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
      createCompetitionTeam(){

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
