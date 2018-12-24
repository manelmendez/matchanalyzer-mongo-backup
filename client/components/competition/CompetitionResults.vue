<template>
  <div v-if="competition.rounds == 0">
    <v-card>
      <v-card-text class="text-xs-center">
        Aun no hay ninguna jornada disputada
        <br>
        <v-btn
          fab
          color="pink"
          dark
          @click.stop="dialog=!dialog"
        >
          <i class="material-icons">add</i>
        </v-btn>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog" width="70%" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Añadir Jornada</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 md4>
                <v-select
                  :items="competition.teams"
                  item-text="name"
                  item-value="_id"
                  label="Elige equipo local"
                  v-model="team"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 md4 class="text-xs-center">
                Resultado
                <v-layout wrap>
                  <v-flex xs12 md4 class="text-xs-center">
                    <v-text-field class="centered-input" v-model="localGoals" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 md4 class="text-xs-center">
                    -
                  </v-flex>
                  <v-flex xs12 md4 class="text-xs-center">
                    <v-text-field class="centered-input" v-model="awayGoals" required></v-text-field>
                  </v-flex>
              </v-layout>
              </v-flex>
              <v-flex xs12 md4>
                <v-select
                  :items="competition.teams"
                  item-text="name"
                  item-value="_id"
                  label="Elige equipo visitante"
                  v-model="team2"
                  required
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-btn color="primary" @click.native="createRound()">Continue</v-btn>
        <v-btn flat @click.native="dialog=!dialog">Cancel</v-btn>
      </v-card>
    </v-dialog>
  </div>
  <div v-else></div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
  export default {
    name: "CompetitionResults",
    data: () => ({
      dialog: false,
    }),
    methods: {
      ...mapActions([
        'getCompetition',
        'addNoManagerTeam'
      ])
    },
    computed: {
      ...mapGetters([
        'competition'
      ])
    },
    created() {
      this.getCompetition(this.$route.params.id)
    }
  }
</script>
<style>
.centered-input input {
  text-align: center
}
</style>