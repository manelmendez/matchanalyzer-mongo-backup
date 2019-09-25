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
          <v-list-item-title v-text="competition.myTeam.name + ' - ' + competition.discipline + ' - ' + competition.category + ' - ' + competition.name"></v-list-item-title>
        </v-list-item-content>
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
    <CreateCompetition v-if="dialog" :show="dialog" @confirm="confirmCreate" @close="dialog=!dialog"></CreateCompetition>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import CreateCompetition from '../../components/modals/CreateCompetition'
  export default {
    name: "MyCompetitions",
    components: {
      CreateCompetition
    },
    data: () => ({
      dialog: false,
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
      ...mapActions({
        getUserCompetitions:'competition/getUserCompetitions',
        getUserTeams:'team/getUserTeams'
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
