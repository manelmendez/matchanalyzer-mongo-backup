<template>
  <v-container>
    <p v-if="this.teams.length == 0">Aún no tienes equipos. Dale al botón para crear uno</p>
    <div v-else >
      <v-list>
        <v-list-tile
          v-for="team in this.teams"
          :key="team._id"
          avatar
          @click="goTo(team._id, team)"
        >
          <v-list-tile-content>
            <v-list-tile-title v-text="team.name"></v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-avatar>
            <img :src="team.avatar">
          </v-list-tile-avatar>
        </v-list-tile>
      </v-list>
    </div>
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
        <v-btn color="primary" @click.native="createTeam()">Continue</v-btn>
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
    name: "Teams",
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
          name: "MyTeam",
          params: {
            id: id
          }
        })
      },
      createTeam() {
        let body = {
          season: this.season,
          name: this.name,
          manager: this.user._id
        }
        this.addTeam(body).then((response) => {
          if(response.status === 200) {
            this.dialog=false
          }
        })
      },
      ...mapActions([
        'getAllTeams',
        'addTeam',
        'selectTeam'
      ])
    },
    computed:{
      ...mapGetters([
        'teams',
        'user'
      ])
    },
    created() {
      //do something after creating vue instance
      this.getAllTeams()
    }
  }
</script>
