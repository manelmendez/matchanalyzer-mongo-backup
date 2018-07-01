<template>
  <v-content>
  <!-- component matched by the route will render here -->
    <v-container>
      {{this.teams}}
      <p v-if="this.teams.length == 0">AÚN NO TIENES EQUIPOS</p>
      <p v-else >HOLA NOOB</p>
      <v-dialog v-model="dialog" persistent>
        <v-card>
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">Crear equipo</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 2" step="2">Imagen del equipo</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="3">Camisetas</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card>
                  <v-card-title>
                    <span class="headline">Datos del equipo:</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 md4>
                          <v-text-field label="Nombre del equipo" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4>
                          <v-text-field label="Email" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4>
                          <v-select
                            :items="temporada"
                            label="Temporada"
                            required
                          ></v-select>
                        </v-flex>
                      </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                </v-card>
                <v-btn color="primary" @click.native="e1 = 2">Continue</v-btn>
                <v-btn flat @click.native="dialog=!dialog">Cancel</v-btn>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-card>
                  <v-container fluid grid-list-sm>

                        <v-avatar :tile="false" :size="120" color="grey lighten-4">
                          <img src="../assets/images/futbol1.png">
                        </v-avatar>
                        <v-avatar :tile="false" :size="120" color="grey lighten-4">
                          <img src="../assets/images/futbol2.png">
                        </v-avatar>
                        <v-avatar :tile="false" :size="120" color="grey lighten-4">
                          <img src="../assets/images/futbol3.png">
                        </v-avatar>
                        <v-avatar :tile="false" :size="120" color="grey lighten-4">
                          <img src="../assets/images/futbol4.png">
                        </v-avatar>
                        <v-avatar :tile="false" :size="120" color="grey lighten-4">
                          <img src="../assets/images/futbol5.png">
                        </v-avatar>
                        <v-avatar :tile="false" :size="120" color="grey lighten-4">
                          <img src="../assets/images/futbol6.png">
                        </v-avatar>
                        <v-avatar :tile="false" :size="120" color="grey lighten-4">
                          <img src="../assets/images/futbol7.png">
                        </v-avatar>
                        <v-avatar :tile="false" :size="120" color="grey lighten-4">
                          <img src="../assets/images/futbol8.png">
                        </v-avatar>

                  </v-container>
                </div>
                </v-card>
                <v-btn color="primary" @click.native="e1 = 3">Continue</v-btn>
                <v-btn flat @click.native="dialog=!dialog">Cancel</v-btn>
              </v-stepper-content>
              <v-stepper-content step="3">
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click.native="createTeam()">Continue</v-btn>
                <v-btn flat @click.native="dialog=!dialog">Cancel</v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card>
      </v-dialog>
      <v-btn
        fab
        color="pink"
        dark
        bottom
        right
        fixed
        @click.stop="openCreateDialog()"
      >
        <i class="material-icons">add</i>
      </v-btn>
    </v-container>
  </v-content>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

  export default {
    name: "Teams",
    data: () => ({
      dialog: false,
      e1: 0,
      temporada: [
        "12/13",
        "13/14",
        "14/15",
        "15/16",
        "16/17",
        "17/18",
        "18/19"
      ],

    }),
    methods: {
      openCreateDialog() {
        this.dialog=true
      },
      createTeam() {
        this.dialog=false
      },
      ...mapActions([
        'getAllTeams'
      ])
    },
    computed:{
      ...mapGetters([
        'teams'
      ])
    },
    created() {
      //do something after creating vue instance
      this.getAllTeams()
    }
  }
</script>
