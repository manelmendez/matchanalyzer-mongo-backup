<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-layout align-center>
          <v-flex xs1>
            <v-img :src="constants.ADDRESS+team.avatar" alt="avatar" :contain="true" height="40" width="40">
          </v-flex>
          <v-flex>  
            {{this.team.name}}
          </v-flex>
        </v-layout>
        <v-spacer></v-spacer>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn text icon color="blue lighten-2" @click="click" v-on="on">
              <v-icon size="18">edit</v-icon>
            </v-btn>
            </template>
          <span>Editar equipo</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn text icon color="red lighten-2" v-on="on">
              <v-icon size="18">delete</v-icon>
            </v-btn>
            </template>
          <span>Borrar equipo</span>
        </v-tooltip>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="teamPlayers"
        class="elevation-1 text-xs-center"
        hide-default-footer
      >
        <template v-slot:items>
          <td class="text-center">
            <v-img :src="constants.ADDRESS+item.avatar" alt="avatar" :contain="true">
          </td>
          <td class="text-center">{{ item.name }}</td>
          <td class="text-center">{{ item.position }}</td>
          <td class="text-center">{{ item.year }}</td>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn text icon color="blue lighten-2" @click="click" v-on="on">
                <v-icon size="18">edit</v-icon>
              </v-btn>
            </template>
            <span>Editar jugador</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
            <v-btn text icon color="red lighten-2" v-on="on">
              <v-icon size="18">delete</v-icon>
            </v-btn>
            </template>
            <span>Borrar jugador</span>
          </v-tooltip>
        </template>
        <template v-slot:no-data>
          <v-col>
            <v-alert :value="true" type="error" icon="warning">
              No hay jugadores en este equipo :(
            </v-alert>
          </v-col>
        </template>
      </v-data-table>
    </v-card>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn
          fab
          color="pink"
          dark
          bottom
          right
          fixed
          @click.stop="dialog=!dialog"
          v-on="on"
        >
          <i class="material-icons">add</i>
        </v-btn>
        </template>
      <span>Añadir jugador</span>
    </v-tooltip>
    <CreatePlayer v-if="dialog" :show="dialog" @confirm="createPlayer" @close="dialog=!dialog"></CreatePlayer>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import CreatePlayer from '../../components/modals/CreatePlayer'
import constants from '../../assets/constants/constants'
  export default {
    name: "team",
    components: {
      CreatePlayer
    },
    data: () => ({
      constants: constants,
      dialog: false,
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
        { text: 'Acciones', value: 'actions', align: 'center', }
      ],
    }),
    methods: {
      createPlayer(){
        this.dialog = false
      },
      click(){
        alert("gilipolias")
      },
      ...mapActions({
        getTeam: 'team/getTeam',
      })
    },
    computed: {
      ...mapGetters("team",[
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
<style scoped>
</style>
