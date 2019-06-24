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
          <v-list-tile-title v-text="competition.myTeam.name + ' - ' + competition.discipline + ' - ' + competition.category + ' - ' + competition.name"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
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
      ...mapActions([
        'getUserCompetitions',
        'getUserTeams'
      ]),
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
