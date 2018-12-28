<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs6
              sm4
              md3
              lg2
              xl1
              v-for="team in competition.teams" :key="team._id">
        <v-card class="teamCard">
          <v-img justify-center
            :src="team.avatar"
            aspect-ratio="1"
          ></v-img>
          <v-card-title primary-title>
            <div>
              <h4>{{team.name}}</h4>
              <div v-if="competition.myTeam._id == team._id">Nº de jugadores: {{team.players.length}}</div>
              <div v-else><br></div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" width="50%" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Datos del equipo:</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 md6>
                <v-text-field label="Nombre del equipo" v-model="name" required></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-select
                  :items="temporada"
                  label="Temporada"
                  v-model="season"
                  required
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-btn color="primary" @click.native="createCompetitionTeam()">Continue</v-btn>
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
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
  export default {
    name: "CompetitionSummary",
    data: () => ({
      dialog: false,
      temporada: [
        "14/15",
        "15/16",
        "16/17",
        "17/18",
        "18/19"
      ],
      name: '',
      season: ''
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
        let body = {
          team: {
            season: this.season,
            name: this.name
          },
          competition: this.competition._id
        }
        this.addNoManagerTeam(body).then((response) => {
          if(response.status === 200) {
            this.dialog=false
          }
        })
      },
      ...mapActions([
        'addNoManagerTeam'
      ])
    },
    computed: {
      ...mapGetters([
        'competition'
      ])
    }
  }
</script>
<style>
.teamCard{
  cursor: pointer;
}
</style>