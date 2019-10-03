<template>
<v-container fluid v-if="competition.rounds">
  <v-row v-if="competition.rounds.length == 0">
    <v-card class="no-data">
      <v-card-text class="text-center">
        Aun no hay ninguna jornada disputada
        <br>
      </v-card-text>
    </v-card>
  </v-row>
  <v-row v-else>
    <ClassificationTable :rankedTeams="rankedTeams"></ClassificationTable>
  </v-row>
</v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import constants from '../../../assets/constants/constants'
import ClassificationTable from '../../../components/ClassificationTable'
  export default {
    name: "classification",
    components: {
      ClassificationTable
    },
    data: () => ({
      constants: constants,
    }),
    computed: {
      ...mapGetters("competition",[
        'competition',
        'selectedRound',
        'rankedTeams'
      ]),
    }
  }
</script>
<style>
.no-data {
  width: 100%;
}
</style>
