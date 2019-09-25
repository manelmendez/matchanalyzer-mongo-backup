<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs6
              sm4
              md3
              lg2
              xl1
              v-for="team in competition.teams" :key="team._id">
        <v-card class="teamCard" min-height="100%">
          <v-col>
          <v-img 
            justify="center"
            :src="constants.ADDRESS+team.avatar"
            aspect-ratio="2"
            contain
          ></v-img>
          </v-col>
          <v-card-title class="title-card">
            {{team.name}}
          </v-card-title>
          <v-card-text v-if="competition.myTeam._id == team._id">
            Nº de jugadores: {{team.players.length}}  
          </v-card-text>
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
      @click.stop="dialog=!dialog"
    >
      <i class="material-icons">add</i>
    </v-btn>
    <CreateTeam v-if="dialog" :show="dialog" @confirm="confirm" @close="dialog=!dialog"></CreateTeam>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import constants from '../../../assets/constants/constants'
import CreateTeam from '../../../components/modals/CreateTeam'
  export default {
    components: {
      CreateTeam
    },
    data: () => ({
      constants: constants,
      dialog: false,
    }),
    methods: {
      confirm(){
        this.dialog = false
      },
      ...mapActions("competition",[
        'getCompetition'
      ])
    },
    computed: {
      ...mapGetters("competition",[
        'competition'
      ])
    }
  }
</script>
<style>
.teamCard{
  cursor: pointer;
}
.uploadPhoto {
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 209, 89, 0.44);
  cursor: pointer;
}
.title-card{
  font-size: 18px;
}
</style>

