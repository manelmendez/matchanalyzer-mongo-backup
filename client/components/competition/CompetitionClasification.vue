<template>
  <v-data-table
    :headers="headers"
    :items="rankedTeams"
    class="elevation-1 text-xs-center"
    hide-actions
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">{{ props.index+1 }}</td>
      <td class="text-xs-center">{{ props.item.name }}</td>
      <td class="text-xs-center">{{ props.item.stats[props.item.stats.length -1].points }}</td>
      <td class="text-xs-center">{{ props.item.stats[props.item.stats.length -1].wins }}</td>
      <td class="text-xs-center">{{ props.item.stats[props.item.stats.length -1].draws }}</td>
      <td class="text-xs-center">{{ props.item.stats[props.item.stats.length -1].loses }}</td>
      <td class="text-xs-center">{{ props.item.stats[props.item.stats.length -1].goals }}</td>
      <td class="text-xs-center">{{ props.item.stats[props.item.stats.length -1].againstGoals }}</td>
      <td class="text-xs-center"></td>
      <td class="text-xs-center">{{ props.item.stats[props.item.stats.length -1].homePoints }}</td>
      <td class="text-xs-center">{{ props.item.stats[props.item.stats.length -1].homeWins }}</td>
      <td class="text-xs-center">{{ props.item.stats[props.item.stats.length -1].homeDraws }}</td>
      <td class="text-xs-center">{{ props.item.stats[props.item.stats.length -1].homeLoses }}</td>
      <td class="text-xs-center">{{ props.item.stats[props.item.stats.length -1].homeGoals }}</td>
      <td class="text-xs-center">{{ props.item.stats[props.item.stats.length -1].homeAgainstGoals }}</td>
      <td class="text-xs-center"></td>
      <td class="text-xs-center">{{ props.item.stats[props.item.stats.length -1].awayPoints }}</td>
      <td class="text-xs-center">{{ props.item.stats[props.item.stats.length -1].awayWins }}</td>
      <td class="text-xs-center">{{ props.item.stats[props.item.stats.length -1].awayDraws }}</td>
      <td class="text-xs-center">{{ props.item.stats[props.item.stats.length -1].awayLoses }}</td>
      <td class="text-xs-center">{{ props.item.stats[props.item.stats.length -1].awayGoals }}</td>
      <td class="text-xs-center">{{ props.item.stats[props.item.stats.length -1].awayAgainstGoals }}</td>
    </template>
    <template slot="no-data">
      <v-alert :value="true" color="error" icon="warning">
        Aún no están los datos de esta jornada :(
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
      
    },
    computed: {
      rankedTeams() {
        let teams = [...this.$store.state.competition.teams]
        // esto ordena primero por puntos y luego por diferencia de goles
        return teams.sort(function(b, a) {
          if (a.stats[a.stats.length -1].points !== b.stats[b.stats.length -1].points) {
              return a.stats[a.stats.length -1].points - b.stats[b.stats.length -1].points
          }
          if (a.stats[a.stats.length -1].goals-a.stats[a.stats.length -1].againstGoals === b.stats[b.stats.length -1].goals-b.stats[b.stats.length -1].againstGoals) {
            return 0;
          }
          return (a.stats[a.stats.length -1].goals-a.stats[a.stats.length -1].againstGoals) > (b.stats[b.stats.length -1].goals-b.stats[b.stats.length -1].againstGoals) ? 1 : -1;
        })
      }
    }
  }
</script>
