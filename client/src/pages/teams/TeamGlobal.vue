<template>
  <v-container fluid>
    <v-card
      class="mt-3 mx-auto"
      max-width="50%"
      max-height="50%"
    >
      <v-sheet
        class="v-sheet--offset mx-auto"
        color="cyan"
        elevation="12"
        max-width="calc(100% - 32px)"
        max-height="calc(100% - 32px)"
      >
        <line-chart :chart-data="datacollection"></line-chart>
      </v-sheet>

      <v-card-text class="pt-0">
        <div class="title font-weight-light mb-2">Recorrido del equipo</div>
        <div class="subheading font-weight-light grey--text">Temporada 2018/19</div>
        <v-divider class="my-2"></v-divider>
        <v-icon
          class="mr-2"
          small
        >
          mdi-clock
        </v-icon>
        <span class="caption grey--text font-weight-light">Último partido 8 Abril 2019</span>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import constants from '../../assets/constants/constants'
import LineChart from '../../components/charts/LineChart.js'

  export default {
    name: "TeamGlobal",
    components: { LineChart },
    data: () => ({
      constants: constants,
      
    }),
    methods: {
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
      ...mapActions([
        'getTeam',
      ])
    },
    computed: {
      ...mapGetters([
        'team',
      ]),
      datacollection: function () {        
        return {
          labels: ["J1","J2","J3","J4","J5","J6","J7","J8","J9","J10","J11","J12","J13","J14","J15","J16","J17","J18"],
          datasets: [
            {
              label: 'Puntos',
              data: [this.getRandomInt(), this.getRandomInt(),this.getRandomInt(),this.getRandomInt(),this.getRandomInt(),this.getRandomInt(),this.getRandomInt(), this.getRandomInt(),this.getRandomInt(),this.getRandomInt(),this.getRandomInt(),this.getRandomInt(),this.getRandomInt(), this.getRandomInt(),this.getRandomInt(),this.getRandomInt(),this.getRandomInt(),this.getRandomInt()]
            }, 
          ]
        }
      }
    },
    created() {
      //do something after creating vue instance
      this.getTeam(this.$route.params.id)
    },
  }
</script>
<style>
  .v-sheet--offset {
    top: -24px;
    position: relative;
    color: '#257747'
  }
</style>