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
  <ClassificationTable v-else :rankedTeams="rankedTeams"></ClassificationTable>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import constants from '../../assets/constants/constants'
import ClassificationTable from '../../components/ClassificationTable'
  export default {
    name: "CompetitionClasification",
    components: {
      ClassificationTable
    },
    data: () => ({
      constants: constants,
    }),
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

</style>
