<template>
  <v-data-table
    :headers="headers"
    :items="competition.teams"
    class="elevation-1 text-xs-center"
    hide-actions
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">{{ props.index+1 }}</td>
      <td class="text-xs-center">{{ props.item.name }}</td>
      <td class="text-xs-center">{{ props.item.stats.points }}</td>
      <td class="text-xs-center">{{ props.item.stats.wins }}</td>
      <td class="text-xs-center">{{ props.item.stats.draws }}</td>
      <td class="text-xs-center">{{ props.item.stats.loses }}</td>
      <td class="text-xs-center">{{ props.item.stats.goals }}</td>
      <td class="text-xs-center">{{ props.item.stats.againstGoals }}</td>
      <td class="text-xs-center"></td>
      <td class="text-xs-center">{{ props.item.stats.homePoints }}</td>
      <td class="text-xs-center">{{ props.item.stats.homeWins }}</td>
      <td class="text-xs-center">{{ props.item.stats.homeDraws }}</td>
      <td class="text-xs-center">{{ props.item.stats.homeLoses }}</td>
      <td class="text-xs-center">{{ props.item.stats.homeGoals }}</td>
      <td class="text-xs-center">{{ props.item.stats.homeAgainstGoals }}</td>
      <td class="text-xs-center"></td>
      <td class="text-xs-center">{{ props.item.stats.awayPoints }}</td>
      <td class="text-xs-center">{{ props.item.stats.awayWins }}</td>
      <td class="text-xs-center">{{ props.item.stats.awayDraws }}</td>
      <td class="text-xs-center">{{ props.item.stats.awayLoses }}</td>
      <td class="text-xs-center">{{ props.item.stats.awayGoals }}</td>
      <td class="text-xs-center">{{ props.item.stats.awayAgainstGoals }}</td>
    </template>
    <template slot="no-data">
      <v-alert :value="true" color="error" icon="warning">
        No hay jugadores en este equipo :(
      </v-alert>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
  export default {
    name: "CompetitionClasification",
    data: () => ({
      headers: [
          { text: 'P', align: 'center', sortable: false, value: 'name'},
          { text: 'Nombre', align: 'center', sortable: false, value: 'name'},
          { text: 'PTS', value: 'points', align: 'center', sortable: false,},
          { text: 'V', value: 'wins', align: 'center', sortable: false,},
          { text: 'E', value: 'draws', align: 'center', sortable: false,},
          { text: 'D', value: 'loses', align: 'center', sortable: false,},
          { text: 'GF', value: 'goals', align: 'center', sortable: false,},
          { text: 'GC', value: 'againstGoals', align: 'center', sortable: false,},
          { text: 'En Casa', sortable: false },
          { text: 'PTS', value: 'points', align: 'center', sortable: false,},
          { text: 'V', value: 'wins', align: 'center', sortable: false,},
          { text: 'E', value: 'draws', align: 'center', sortable: false,},
          { text: 'D', value: 'loses', align: 'center', sortable: false,},
          { text: 'GF', value: 'goals', align: 'center', sortable: false,},
          { text: 'GC', value: 'againstGoals', align: 'center', sortable: false,},
          { text: 'Fuera', sortable: false },
          { text: 'PTS', value: 'points', align: 'center', sortable: false,},
          { text: 'V', value: 'wins', align: 'center', sortable: false,},
          { text: 'E', value: 'draws', align: 'center', sortable: false,},
          { text: 'D', value: 'loses', align: 'center', sortable: false,},
          { text: 'GF', value: 'goals', align: 'center', sortable: false,},
          { text: 'GC', value: 'againstGoals', align: 'center', sortable: false,},
        ],
    }),
    methods: {
      ...mapActions([
        'getCompetition',
        'addNoManagerTeam'
      ])
    },
    computed: {
      ...mapGetters([
        'competition'
      ])
    },
    created() {
      this.getCompetition(this.$route.params.id)
    }
  }
</script>
