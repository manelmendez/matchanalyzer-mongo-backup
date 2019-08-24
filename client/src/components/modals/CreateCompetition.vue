<template>
  <v-dialog v-model="show" width="70%" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">Datos de la competición:</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 md4>
              <v-text-field label="Nombre de la competición" v-model="name" required></v-text-field>
            </v-flex>
            <v-flex xs12 md4>
              <v-select
                :items="myTeams"
                item-text="name"
                item-value="_id"
                label="Equipo que participa"
                v-model="team"
                required
              ></v-select>
            </v-flex>
            <v-flex xs12 md4>
              <v-select
                :items="seasons"
                label="Temporada de la competición"
                v-model="season"
                required
              ></v-select>
            </v-flex>
            <v-flex xs12 md4>
              <v-select
                :items="disciplines"
                label="Disciplina"
                v-model="discipline"
                required
              ></v-select>
            </v-flex>
            <v-flex xs12 md4>
              <v-select
                :disabled="discipline==''"
                :items="(discipline=='F7') ? categoriesF7 : categoriesF11"
                label="Categoria"
                v-model="category"
                required
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-btn color="primary" @click.native="confirm">Continue</v-btn>
      <v-btn text @click.native="close">Cancel</v-btn>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data:() => ({
    name: '',
      team: '',
      season: '',
      seasons: [
        "14/15",
        "15/16",
        "16/17",
        "17/18",
        "18/19"
      ],
      disciplines: [
        "F7",
        "F11"
      ],
      categoriesF7: [
        "Prebenjamín",
        "Benjamín",
        "Alevín"
      ],
      categoriesF11: [
        "Infantil",
        "Cadete",
        "Juvenil",
        "Amateur"
      ],
      discipline: "",
      category: ""
  }),
  props:{
    show: Boolean
  },
  computed: {
    ...mapGetters([
      'user',
      'myTeams',
    ])
  },
  methods: {
    confirm() {
      let competition = {
        name: this.name,
        season: this.season,
        team: this.team,
        manager: this.user._id,
        discipline: this.discipline,
        category: this.category
      }
      this.addCompetition(competition).then((value) => {
        this.$emit('confirm')
      })
    },
    close() {
      this.$emit('close')
    },
    ...mapActions([
        'addCompetition',
    ])
  }
}
</script>
<style scoped>

</style>
