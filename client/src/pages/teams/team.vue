<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-layout align-center>
          <v-flex xs1>
            <v-img :src="constants.LOCAL_ADDRESS+team.avatar" alt="avatar" :contain="true" height="40" width="40">
          </v-flex>
          <v-flex>  
            {{this.team.name}}
          </v-flex>
        </v-layout>
        <v-spacer></v-spacer>
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
            <v-img :src="constants.LOCAL_ADDRESS+props.item.avatar" alt="avatar" :contain="true">
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
<style scoped>
</style>
