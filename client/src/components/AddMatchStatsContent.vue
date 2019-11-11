<template>
  <v-col v-if="team._id != competition.myTeam._id">
    Añadir stats del equipo rival se implementará en el futuro
  </v-col>
  <v-col v-else>
    <v-row dense class="mr-5 ml-5">
      <v-col cols=9 class="text-center">
        <v-select
          outlined
          shaped
          v-model="formacion"
          :items="formacionesF7"
          item-text="name"
          item-value="name"
          label="Elegir formación">
          <template v-slot:item="{item}">
            <v-row>
              <v-col cols=2 class="text-center" align-self="center">
                {{item.name}}
              </v-col>
              <v-divider vertical></v-divider>
              <v-col>
                <v-img :src="item.image" :contain="true" aspect-ratio="4"></v-img>
              </v-col>
            </v-row>
          </template>
        </v-select>
      </v-col>
      <v-col>
        <v-text-field outlined shaped label="Duración" class="centered-input ml-2" type="number" v-model="duration" required></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mr-5 ml-5" dense>
      <v-col>
        <v-row class="text-center" justify="center" align="center" dense>
          Añadir jugadores:
          <v-btn class="ml-2" fab color="pink" x-small dark @click.stop="totalplayers+=1,players.push({})">
            <i class="material-icons">add</i>
          </v-btn>
        </v-row>
        <v-row dense>
          <v-col xs="12"
            sm="12"
            md="6"
            lg="6"
            xl="6"
            v-for="i in totalplayers" :key="i"
            >
            <v-row dense>
              <v-col>
                <v-select 
                  dense
                  outlined
                  shaped  
                  v-model="players[i-1].player"
                  :items="team.players"
                  item-text="name"
                  return-object
                  label="Jugador"></v-select>
              </v-col>
              <v-col>
                <v-select 
                  dense
                  outlined
                  shaped 
                  v-model="players[i-1].position"
                  :items="positions"
                  item-text="name"
                  label="Posición"></v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row dense class="mr-5 ml-5">
      <v-col>
        <v-row dense class="text-center" justify="center" align="center">
          Añadir goles:
          <v-btn class="ml-2" fab color="pink" x-small dark @click.stop="totalgoals+=1, goals.push({})">
            <i class="material-icons">add</i>
          </v-btn>
        </v-row>
        <v-row dense>
          <v-col xs="12"
            sm="12"
            md="6"
            lg="6"
            xl="6"
            v-for="i in totalgoals" :key="i"
            >
            <v-row dense>
              <v-col>
                <v-select 
                  dense
                  outlined
                  shaped  
                  v-model="goals[i-1].player"
                  :items="players"
                  item-text="player.name"
                  item-value="_id"
                  label="Jugador"></v-select>
              </v-col>
              <v-col>
                <v-text-field dense outlined shaped label="Minute" :max="duration" class="centered-input ml-2" type="number" v-model="goals[i-1].minute" required></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row dense class="mr-5 ml-5">
      <v-col>
        <v-row dense class="text-center" justify="center" align="center">
          Añadir tarjetas:
          <v-btn class="ml-2" fab color="pink" x-small dark @click.stop="totalcards+=1">
            <i class="material-icons">add</i>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-row dense class="mr-5 ml-5">
      <v-col>
        <v-row class="text-center" justify="center" align="center">
          Añadir cambios:
          <v-btn class="ml-2" fab color="pink" x-small dark @click.stop="totalchanges+=1">
            <i class="material-icons">add</i>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-col>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  props: {
    team: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      positions: [
        'PT',
        'LD',
        'LI',
        'CT',
        'MCD',
        'MC',
        'MP',
        'ED',
        'EI',
        'DC'
      ],
      formacionesF7: [
        {
          name: '3-2-1',
          image: require('/assets/images/formaciones/3-2-1.png')
        },
        {
          name: '2-3-1',
          image: require('/assets/images/formaciones/2-3-1.png')
        },
        {
          name: '3-1-2',
          image: require('/assets/images/formaciones/3-1-2.png')
        },
        {
          name: '3-3',
          image: require('/assets/images/formaciones/3-3.png')
        },
        {
          name: '4-2',
          image: require('/assets/images/formaciones/4-2.png')
        },

      ],
      totalplayers: 1,
      totalgoals: 0,
      totalcards: 0,
      totalchanges: 0,
      formacion: '',
      players: [{}],
      goals: [{}],
      cards: [{}],
      duration: 0
    }
  },
  computed: {
    ...mapGetters("competition", ["competition"])
  }
}
</script>
<style scoped>

</style>