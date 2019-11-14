<template>
  <v-container fluid grid-list-md>
    <v-row dense>
      <v-col xs="6"
        sm="4"
        md="3"
        lg="2"
        xl="1"
        v-for="team in competition.teams" :key="team._id">
        <v-card class="teamCard d-flex flex-column" min-height="100%" @click.native.stop="goTo(team._id)">
          <v-col>
            <v-img 
              justify="center"
              :src="constants.ADDRESS+team.avatar"
              @error="team.avatar=constants.DEFAULT_TEAM_URL"
              aspect-ratio="2"
              contain
            ></v-img>
          </v-col>
          <v-card-text class="title-card text-center grow">
            <b>{{team.name}}</b>
          </v-card-text>
          <v-card-text class="text-center" height="100%" v-if="competition.myTeam._id == team._id">
            Nº de jugadores: {{team.players.length}}  
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-actions v-if="competition.myTeam._id != team._id">
            <v-spacer></v-spacer>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn text icon color="blue lighten-2" @click.stop="updatingTeam=team, dialog=true" v-on="on">
                  <v-icon size="18">edit</v-icon>
                </v-btn>
              </template>
              <span>Editar equipo</span>
            </v-tooltip>
            <v-tooltip top v-if="competition.rounds.length==0">
              <template v-slot:activator="{ on }">
              <v-btn text icon color="red lighten-2" v-on="on" @click.stop="deletingTeam=team._id ,deleteDialog=true">
                <v-icon size="18">delete</v-icon>
              </v-btn>
              </template>
              <span>Borrar equipo</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-btn
      fab
      color="accent"
      dark
      bottom
      right
      fixed
      @click.stop="dialog=!dialog"
    >
      <i class="material-icons">add</i>
    </v-btn>
    <CreateTeam v-if="dialog" :team="(updatingTeam ? updatingTeam : null)" :show="dialog" @confirm="confirm" @close="dialog=!dialog, updatingTeam=null"></CreateTeam>
    <DeleteDialog
      v-if="deleteDialog"
      :show="deleteDialog"
      type="team"
      @close="deleteDialog=!deleteDialog, deletingTeam=null"
      @delete="deleteTeamFunction"
    ></DeleteDialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import constants from '../../../assets/constants/constants'
import CreateTeam from '../../../components/modals/CreateTeam'
import DeleteDialog from '../../../components/modals/DeleteDialog'
  export default {
    components: {
      CreateTeam,
      DeleteDialog
    },
    data: () => ({
      constants: constants,
      dialog: false,
      deleteDialog: false,
      updatingTeam: null,
      deletingTeam: null
    }),
    methods: {
      goTo(teamId) {
        this.$router.push('/teams/'+teamId+'/global')
      },
      confirm(){
        this.dialog = false
        if (this.updatingTeam) {
          this.getCompetition(this.competition._id)
        }
      },
      deleteTeamFunction() {
        this.deleteTeam(this.deletingTeam).then((response) =>{  
          this.getCompetition(this.competition._id)        
          this.deleteDialog = false
        })
        .catch((err) => {   
          this.deleteDialog = false         
          let snackbar = {
            show: true,
            color: "error",
            text: err.data.message
          };
          this.$store.commit("root/SNACKBAR", snackbar);
        })
      },
      ...mapActions({
        getCompetition:'competition/getCompetition',
        deleteTeam:'team/deleteTeam'
      })
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
.title-card{
  font-size: 15px;
}
</style>

