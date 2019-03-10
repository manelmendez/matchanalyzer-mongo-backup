<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-list-tile-avatar>
          <v-img :src="team.avatar">
        </v-list-tile-avatar>
        {{this.team.name}}
        <v-btn flat icon color="blue lighten-2" @click="click">
          <v-icon size="18">edit</v-icon>
        </v-btn>
        <v-btn flat icon color="red lighten-2">
          <v-icon size="18">delete</v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="teamPlayers"
        class="elevation-1 text-xs-center"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-center">
            <v-list-tile-avatar>
              <img :src="props.item.avatar" alt="avatar">
            </v-list-tile-avatar>
          </td>
          <td class="text-xs-center">{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.position }}</td>
          <td class="text-xs-center">{{ props.item.year }}</td>
          <td class="text-xs-center align-center">
            <v-btn flat icon color="blue lighten-2" @click="click">
              <v-icon size="18">edit</v-icon>
            </v-btn>
            <v-btn flat icon color="red lighten-2">
              <v-icon size="18">delete</v-icon>
            </v-btn>
          </td>
        </template>
        <template slot="no-data">
          <v-alert :value="true" color="error" icon="warning">
            No hay jugadores en este equipo :(
          </v-alert>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" width="70%" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Datos del jugador:</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 md4>
                <v-text-field label="Nombre y apellidos" v-model="name" required></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-select
                  :items="positions"
                  label="Posicion"
                  v-model="position"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 md4>
                <v-select
                  :items="years"
                  label="Año de nacimiento"
                  v-model="year"
                  required
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-btn color="primary" @click.native="createPlayer()">Continue</v-btn>
        <v-btn flat @click.native="dialog=!dialog">Cancel</v-btn>
      </v-card>
    </v-dialog>
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
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
  export default {
    name: "MyTeam",
    data: () => ({
      dialog: false,
      name: '',
      position: '',
      year: '',
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
      years: [
        '2007',
        '2008',
        '2009',
        '2011',
        '2012',
        '2013',
        '2014',
      ],
      headers: [
          {
            text: '',
            sortable: false
          },
          {
            text: 'Nombre',
            align: 'center',
            sortable: true,
            value: 'name'
          },
          { text: 'Posición', value: 'position', align: 'center', },
          { text: 'Año de nacimiento', value: 'year', align: 'center', },
          { text: 'Acciones', align: 'center', }
        ],
    }),
    methods: {
      createPlayer(){
        let player = {
          name: this.name,
          position: this.position,
          year: this.year,
          team: this.$route.params.id
        }
        this.addPlayer(player).then((value) => {
          this.dialog = false
        })
      },
      click(){
        alert("gilipolias")
      },
      ...mapActions([
        'getTeam',
        'addPlayer'
      ])
    },
    computed: {
      ...mapGetters([
        'team',
        'teamPlayers'
      ])
    },
    created() {
      //do something after creating vue instance
      this.getTeam(this.$route.params.id)
    }
  }
</script>
