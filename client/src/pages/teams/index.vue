<template>
  <v-container fluid>
    <p v-if="this.myTeams.length == 0">Aún no tienes equipos. Dale al botón para crear uno</p>
    <v-list v-else>
      <v-list-item
        v-for="team in this.myTeams"
        :key="team._id"
        @click="goTo(team._id)"
      >
        <v-list-item-content>
          <v-list-item-title>{{team.name}}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-avatar>
          <v-img lazy-src="https://picsum.photos/id/11/100/60" :src="constants.ADDRESS+team.avatar" :contain="true">
        </v-list-item-avatar>
      </v-list-item>
    </v-list>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn
          fab
          color="pink"
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
      <span>Añadir equipo</span>
    </v-tooltip>
    <CreateTeam v-if="dialog" :myTeam="true" :show="dialog" @confirm="confirmCreate" @close="dialog=!dialog"></CreateTeam>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CreateTeam from '../../components/modals/CreateTeam'
import constants from '../../assets/constants/constants'
  export default {
    components: {
      CreateTeam
    },
    data: () => ({
      constants: constants,
      dialog: false,
    }),
    methods: {
      goTo(id) {
        this.$router.push({
          name: "teams-id",
          params: {
            id: id
          }
        })
      },
      confirmCreate() {
        this.dialog = false
      },
      ...mapActions("team",[
        'getUserTeams'
      ])
    },
    computed:{
      ...mapGetters({
        myTeams: 'team/myTeams',
        user: 'user/user'
      })
    },
    created() {
      //do something after creating vue instance
      this.getUserTeams(this.user._id)
    }
  }
</script>
<style>
.uploadPhoto {
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 209, 89, 0.44);
  cursor: pointer;
}
</style>