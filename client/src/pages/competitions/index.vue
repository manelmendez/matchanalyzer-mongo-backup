<template>
  <v-container fluid>
    <v-layout v-if="this.competitions.length == 0">
      No tienes competiciones
    </v-layout>
    <v-list v-else>
      <v-list-item
        v-for="competition in this.competitions"
        :key="competition._id"
        @click="goTo(competition._id)"
      >
        <v-list-item-content>
          <v-list-item-title v-text="(competition.myTeam ? competition.myTeam.name : 'Equipo Borrado') + ' - ' + competition.discipline + ' - ' + competition.category + ' - ' + competition.name"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn text icon color="blue lighten-2" @click.stop="updatingCompetition=competition, dialog=true" v-on="on">
                <v-icon size="18">edit</v-icon>
              </v-btn>
            </template>
            <span>Editar equipo</span>
          </v-tooltip>
        </v-list-item-action>
        <v-list-item-action>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
            <v-btn text icon color="red lighten-2" v-on="on" @click.stop="deletingCompetition=competition._id ,deleteDialog=true">
              <v-icon size="18">delete</v-icon>
            </v-btn>
            </template>
            <span>Borrar equipo</span>
          </v-tooltip>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn
          fab
          color="accent"
          dark
          bottom
          right
          fixed
          @click.stop="dialog=!dialog"
          v-on="on"
        >
          <i class="material-icons">add</i>
        </v-btn>
      </template>
      <span>Añadir competición</span>
    </v-tooltip>
    <CreateCompetition v-if="dialog" :show="dialog" :competition="(updatingCompetition ? updatingCompetition : null)"  @confirm="confirmCreate" @close="dialog=!dialog,  updatingCompetition=null"></CreateCompetition>
    <DeleteDialog
      v-if="deleteDialog"
      :show="deleteDialog"
      type="competition"
      @close="deleteDialog=!deleteDialog, deletingCompetition=null"
      @delete="deleteCompetitionFunction"
    ></DeleteDialog>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import CreateCompetition from '../../components/modals/CreateCompetition'
import DeleteDialog from '../../components/modals/DeleteDialog'
export default {
    components: {
      CreateCompetition,
      DeleteDialog
    },
    data: () => ({
      dialog: false,
      deleteDialog: false,
      deletingCompetition: null,
      updatingCompetition: null
    }),
    methods: {
      goTo(id) {
        this.$router.push({
          name: "summary",
          params: {
            id: id
          }
        })
      },
      confirmCreate(){        
        this.getUserCompetitions(this.user._id)
        this.dialog = false
      },
      deleteCompetitionFunction(){
        this.deleteCompetition(this.deletingCompetition).then((response) =>{          
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
        getUserCompetitions:'competition/getUserCompetitions',
        getUserTeams:'team/getUserTeams',
        deleteCompetition: 'competition/deleteCompetition'
      }),
    },
    computed: {
      ...mapGetters({
        user:'user/user',
        myTeams:'team/myTeams',
        competitions:'competition/competitions'
      })
    },
    created() {
      //do something after creating vue instance
      this.getUserCompetitions(this.user._id)
      this.getUserTeams(this.user._id)
    }
  }
</script>
