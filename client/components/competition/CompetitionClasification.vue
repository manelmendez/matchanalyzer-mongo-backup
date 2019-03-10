<template>
<div v-if="competition.rounds">
  <div v-if="competition.rounds.length == 0">
    <v-card>
      <v-card-text class="text-xs-center">
        Aun no hay ninguna jornada disputada
        <br>
      </v-card-text>
    </v-card>
  </div>
  <div v-else>
    <v-data-table v-if="rankedTeams"
      :headers="headers"
      :items="rankedTeams"
      class="elevation-1 text-xs-center"
      hide-actions
    >
      <template slot="items" slot-scope="props" >
        <tr :class="setClass(props)">
          <td class="text-xs-center">{{ props.index+1 }}</td>
          <td class="text-xs-center">{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.stats.points }}</td>
          <td class="text-xs-center">{{ props.item.stats.gamesPlayed }}</td>
          <td class="text-xs-center">{{ props.item.stats.wins }}</td>
          <td class="text-xs-center">{{ props.item.stats.draws }}</td>
          <td class="text-xs-center">{{ props.item.stats.loses }}</td>
          <td class="text-xs-center">{{ props.item.stats.goals }}</td>
          <td class="text-xs-center">{{ props.item.stats.againstGoals }}</td>
          <td class="text-xs-center"></td>
          <td class="text-xs-center">{{ props.item.stats.homePoints }}</td>
          <td class="text-xs-center">{{ props.item.stats.homeGamesPlayed }}</td>
          <td class="text-xs-center">{{ props.item.stats.homeWins }}</td>
          <td class="text-xs-center">{{ props.item.stats.homeDraws }}</td>
          <td class="text-xs-center">{{ props.item.stats.homeLoses }}</td>
          <td class="text-xs-center">{{ props.item.stats.homeGoals }}</td>
          <td class="text-xs-center">{{ props.item.stats.homeAgainstGoals }}</td>
          <td class="text-xs-center"></td>
          <td class="text-xs-center">{{ props.item.stats.awayPoints }}</td>
          <td class="text-xs-center">{{ props.item.stats.awayGamesPlayed }}</td>
          <td class="text-xs-center">{{ props.item.stats.awayWins }}</td>
          <td class="text-xs-center">{{ props.item.stats.awayDraws }}</td>
          <td class="text-xs-center">{{ props.item.stats.awayLoses }}</td>
          <td class="text-xs-center">{{ props.item.stats.awayGoals }}</td>
          <td class="text-xs-center">{{ props.item.stats.awayAgainstGoals }}</td>
        </tr>
      </template>
      <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning">
          Aún no están los datos de esta jornada :(
        </v-alert>
      </template>
    </v-data-table>
  </div>
  </div>
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
          { text: 'PJ', value: 'gamesPlayed', align: 'center', sortable: false,},
          { text: 'V', value: 'wins', align: 'center', sortable: false,},
          { text: 'E', value: 'draws', align: 'center', sortable: false,},
          { text: 'D', value: 'loses', align: 'center', sortable: false,},
          { text: 'GF', value: 'goals', align: 'center', sortable: false,},
          { text: 'GC', value: 'againstGoals', align: 'center', sortable: false,},
          { text: 'En Casa', sortable: false },
          { text: 'PTS', value: 'points', align: 'center', sortable: false,},
          { text: 'PJ', value: 'gamesPlayed', align: 'center', sortable: false,},
          { text: 'V', value: 'wins', align: 'center', sortable: false,},
          { text: 'E', value: 'draws', align: 'center', sortable: false,},
          { text: 'D', value: 'loses', align: 'center', sortable: false,},
          { text: 'GF', value: 'goals', align: 'center', sortable: false,},
          { text: 'GC', value: 'againstGoals', align: 'center', sortable: false,},
          { text: 'Fuera', sortable: false },
          { text: 'PTS', value: 'points', align: 'center', sortable: false,},
          { text: 'PJ', value: 'gamesPlayed', align: 'center', sortable: false,},
          { text: 'V', value: 'wins', align: 'center', sortable: false,},
          { text: 'E', value: 'draws', align: 'center', sortable: false,},
          { text: 'D', value: 'loses', align: 'center', sortable: false,},
          { text: 'GF', value: 'goals', align: 'center', sortable: false,},
          { text: 'GC', value: 'againstGoals', align: 'center', sortable: false,},
        ],
    }),
    methods: {
      setClass(props) {
        if(props.index==0) return 'first'
        else if(props.index==1) return 'second'
        else if(props.index==this.rankedTeams.length-1||props.index==this.rankedTeams.length-2||props.index==this.rankedTeams.length-3) return 'descending'
      }
    },
    computed: {
      ...mapGetters([
        'competition',
        'selectedRound',
        'rankedTeams'
      ]),
    }
  }
</script>
<style>
.first{
  background-color: rgba(117, 255, 131, 0.55)
}
.second{
  background-color: rgba(255, 216, 117, 0.55)
}
.descending{
  background-color: rgba(255, 117, 117, 0.55)
}
</style>
