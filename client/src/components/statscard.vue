<template>
  <v-card
    class="mt-9"
  >
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="cyan"
      elevation="12"
      max-width="calc(100% - 32px)"
      max-height="calc(100% - 32px)"
    >
      <line-chart :chart-data="this.chartData" :height="this.height" ></line-chart>
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
</template>

<script>
import LineChart from '../components/charts/LineChart.js'

  export default {
    name: "statscard",
    components: { LineChart },
    props:[
      'chart-data',
      'height'
    ]
  }
</script>
<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
  color: '#257747'
}
</style>