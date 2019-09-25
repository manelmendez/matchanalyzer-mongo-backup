<template>
  <v-container fluid>
      <v-row>
        <v-col>
          <statscard :chart-data="datacollection" :height="100"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols=4>
          <statscard :chart-data="datacollection" :height="200"/>
        </v-col>
        <v-col cols=4>
          <statscard :chart-data="datacollection" :height="200"/>
        </v-col>
        <v-col cols=4>
          <statscard :chart-data="datacollection" :height="200"/>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import constants from '../../assets/constants/constants'
import statscard from '../../components/statscard'

  export default {
    name: "TeamGlobal",
    components: {
      statscard
    },
    data: () => ({
      constants: constants,
    }),
    methods: {
      getRandomInt () {
        return Math.floor(Math.random() * (16 - 1)) + 1
      },
      ...mapActions("team",[
        'getTeam',
      ])
    },
    computed: {
      ...mapGetters("team",[
        'team',
      ]),
      datacollection: function () {        
        return {
          labels: ["J1","J2","J3","J4","J5","J6","J7","J8","J9","J10","J11","J12","J13","J14","J15","J16","J17","J18"],
          datasets: [
            {
              label: 'Posición',
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