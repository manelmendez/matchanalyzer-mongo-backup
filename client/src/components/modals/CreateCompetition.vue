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
      <v-card-actions>
        <v-btn color="primary" @click.native="(competition) ? editCompetition() : createCompetition()">Continue</v-btn>
        <v-btn text @click.native="close">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props:{
    show: Boolean,
    competition: Object,
  },
  data() {
    return {
      name: (this.competition) ? this.competition.name : '',
      team: (this.competition) ? this.competition.myTeam : '',
      season: (this.competition) ? this.competition.season : '',
      seasons: [
        "14/15",
        "15/16",
        "16/17",
        "17/18",
        "18/19",
        "19/20"
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
      discipline: (this.competition) ? this.competition.discipline : "",
      category: (this.competition) ? this.competition.category : ""
    }
  },
  computed: {
    ...mapGetters({
      user:'user/user',
      myTeams:'team/myTeams',
    })
  },
  methods: {
    createCompetition() {
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
    editCompetition() {
      let competition = {
        _id: this.competition._id,
        name: this.name,
        season: this.season,
        team: this.team,
        manager: this.user._id,
        discipline: this.discipline,
        category: this.category
      }
      this.updateCompetition(competition).then((value) => {
        this.$emit('confirm')
      })
    },
    close() {
      this.$emit('close')
    },
    ...mapActions("competition",[
        'addCompetition',
        'updateCompetition'
    ])
  }
}
</script>
<style scoped>

</style>
