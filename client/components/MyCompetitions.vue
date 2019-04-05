<template>
  <v-container fluid>
    <div v-if="this.competitions.length == 0">
      No tienes competiciones
    </div>
    <v-list v-else>
      <v-list-tile
        v-for="competition in this.competitions"
        :key="competition._id"
        avatar
        @click="goTo(competition._id)"
      >
        <v-list-tile-content>
          <v-list-tile-title v-text="competition.name"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-dialog v-model="dialog" width="70%" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Datos de la competición:</span>
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
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
  export default {
    name: "MyCompetitions",
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
      goTo(id) {
        this.$router.push({
          name: "CompetitionBase",
          params: {
            id: id
          }
        })
      },
      createCompetition(){
        let competition = {
          name: this.name,
          season: this.season,
          team: this.team,
          manager: this.user._id
        }
        this.addCompetition(competition).then((value) => {
          console.log(value);
          this.dialog = false
        })
      },
      ...mapActions([
        'addCompetition',
        'getUserCompetitions',
        'getUserTeams'
      ])
    },
    computed: {
      ...mapGetters([
        'user',
        'myTeams',
        'competitions'
      ])
    },
    created() {
      //do something after creating vue instance
      this.getUserCompetitions(this.user._id)
      this.getUserTeams(this.user._id)
    }
  }
</script>
