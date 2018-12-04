<template>
  <v-container>
    <div v-if="true">
      No tienes competiciones
      <v-dialog v-model="dialog" width="70%" persistent>
        <v-card>
          <v-card-title>
            <span class="headline">Datos del jugador:</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 md4>
                  <v-text-field label="Nombre de la competición" v-model="name" required></v-text-field>
                </v-flex>
                <v-flex xs12 md4>
                  <v-select
                    :items="myTeams"
                    item-text="name"
                    item-value="_id"
                    label="Equipo que participa"
                    v-model="team"
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs12 md4>
                  <v-select
                    :items="seasons"
                    label="Temporada de la competición"
                    v-model="season"
                    required
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-btn color="primary" @click.native="createCompetition()">Continue</v-btn>
          <v-btn flat @click.native="dialog=!dialog">Cancel</v-btn>
        </v-card>
      </v-dialog>
      <v-btn
        fab
        color="pink"
        dark
        bottom
        right
        fixed
        @click.stop="dialog=!dialog"
      >
        <i class="material-icons">add</i>
      </v-btn>
    </div>

    <router-view v-else></router-view>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
  export default {
    name: "CompeticionBase",
    data: () => ({
      dialog: false,
      name: '',
      team: '',
      season: '',
      seasons: [
        "14/15",
        "15/16",
        "16/17",
        "17/18",
        "18/19"
      ],
    }),
    methods: {
      createCompetition(){
        let competition = {
          name: this.name,
          season: this.season,
          team: this.team
        }
        console.log(competition)
      },
      ...mapActions([
        'getUserTeams'
      ])
    },
    computed: {
      ...mapGetters([
        'user',
        'myTeams',
      ])
    },
    created() {
      //do something after creating vue instance
      this.getUserTeams(this.user._id)
    }
  }
</script>
