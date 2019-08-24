<template>
  <v-container>
    <p v-if="this.myTeams.length == 0">Aún no tienes equipos. Dale al botón para crear uno</p>
    <v-list v-else>
      <v-list-item
        v-for="team in this.myTeams"
        :key="team._id"
        @click="goTo(team._id)"
      >
        <v-list-item-content>
          <v-list-item-title v-text="team.name"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-avatar>
          <v-img :src="constants.ADDRESS+team.avatar" :contain="true">
        </v-list-item-avatar>
      </v-list-item>
    </v-list>
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
    <CreateMyTeam v-if="dialog" :show="dialog" @confirm="confirmCreate" @close="dialog=!dialog"></CreateMyTeam>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CreateMyTeam from '../../components/modals/CreateMyTeam'
import constants from '../../assets/constants/constants'
  export default {
    components: {
      CreateMyTeam
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
      ...mapActions([
        'getUserTeams',
        'selectTeam',
      ])
    },
    computed:{
      ...mapGetters([
        'myTeams',
        'user'
      ])
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