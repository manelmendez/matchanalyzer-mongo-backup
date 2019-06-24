<template>
  <div v-if="competition.rounds && selectedRound!=null">
    <v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
    <div v-if="competition.rounds.length == 0">
      <v-card>
        <v-card-text class="text-xs-center">
          Aun no hay ninguna jornada disputada
          <br>
          <v-btn fab color="pink" dark>
            <i class="material-icons" @click="createRound()">add</i>
          </v-btn>
        </v-card-text>
      </v-card>
    </div>
    <div v-else>
      <v-card>
        <v-card-title>
          <v-layout row justify-space-between>
            <v-flex xs3>
              <v-select
                :items="competition.rounds"
                item-text="name"
                required
                v-model="round"
                class="headline"
                return-object
                @change="changeResultRound"
              ></v-select>
            </v-flex>
            <v-flex xs3>
              <v-btn round color="blue-grey" class="white--text" @click="createRound()">
                Nueva Jornada
                <v-icon right dark>add</v-icon>
              </v-btn>
              <v-btn
                v-if="round._id == competition.rounds[competition.rounds.length -1]._id"
                round
                color="red lighten-2"
                class="white--text"
                @click.stop="deleteDialog=!deleteDialog"
              >
                Borrar Jornada
                <v-icon right dark>delete</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-text class="text-xs-center" v-if="competition.rounds">
          <div
            v-if="competition.rounds[selectedRound -1].matches.length == 0"
          >Aún no has añadido partidos en esta jornada</div>
          <div v-else>
            <RoundMatches @loading="loading=!loading"></RoundMatches>
          </div>
          <br>
          <v-btn v-if="roundTeams.length != 0" fab color="pink" dark @click.stop="roundDialog=!roundDialog, roundType='new'">
            <i class="material-icons">add</i>
          </v-btn>
        </v-card-text>
      </v-card>
      <RoundModal v-if="roundDialog" :show="roundDialog" type="new" :competition="competition" :roundTeams="roundTeams" :round="competition.rounds[selectedRound -1]._id" @close="roundDialog=!roundDialog" @confirm="createMatch"></RoundModal>
      <DeleteModal :show="deleteDialog" type="jornada" @close="deleteDialog=!deleteDialog" @delete="deleteRoundFunction"></DeleteModal>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import RoundMatches from "../../../components/RoundMatches"
import DeleteModal from "../../../components/modals/DeleteModal"
import RoundModal from "../../../components/modals/RoundModal"
export default {
  components: {
    RoundMatches,
    DeleteModal,
    RoundModal
  },
  data: () => ({
    roundDialog: false,
    deleteDialog: false,
    localGoals: 0,
    awayGoals: 0,
    match: "",
    team: "",
    team2: "",
    editingTeam: "",
    editingTeam2: "",
    editingLocalGoals: 0,
    editingAwayGoals: 0,
    editingMatch: "",
    deletingMatch: "",
    loading: false
  }),
  methods: {
    createRound() {
      let body = {
        round: {
          name: "Jornada " + (this.competition.rounds.length + 1)
        },
        competition: this.competition._id
      };
      this.addRound(body);
    },
    createMatch(newMatch) {
      let body = {
        match: newMatch.match,
        localTeamStats: newMatch.localTeamStats,
        awayTeamStats: newMatch.awayTeamStats
      }
      if (newMatch.match.localTeam == newMatch.match.awayTeam) {
        alert("No puedes seleccionar el mismo equipo en ambos lados");
      }
      // else if (this.team._id == this.competition.myTeam._id || this.team2._id == this.competition.myTeam._id) {
      //   alert("Uno de ellos es tu equipo, rellena las estadísticas")
      // }
      else {
        this.loading=true
        this.addMatch(body).then(response => {
          if (response.status == 200) {
            this.roundDialog = false
            this.loading = false
          }
          else {
            this.roundDialog = false
            this.loading = false
          }
        })
        .catch((e)=>{
          console.log(e)
          this.roundDialog = false
          this.loading = false
        })
      }
    },
    
    changeResultRound(item) {
      //coger el numero de round y ponerlo en selectedRound
      let str = item.name;
      var res = str.split(" ");
      this.changeRound(res[1]);
    },
    
    deleteRoundFunction() {
      let body = {
        round: this.round
      };
      let data = {
        id: this.round._id,
        body: body
      };
      this.loading = true
      this.deleteRound(data).then(response => {
        if (response.status == 200) {
          this.getCompetition(this.$route.params.id);
          this.deleteDialog=false
          this.loading = false
        }
        else {
          this.deleteDialog = false
          this.loading = false
        }
      });
    },
    ...mapActions([
      "getCompetition",
      "addRound",
      "addMatch",
      "changeRound",
      "deleteRound"
    ])
  },
  computed: {
    ...mapGetters(["competition", "roundTeams", "selectedRound"]),
    matches() {      
      return this.$store.getters.matches
    },
    round: {
      get: function() {
        return this.competition.rounds[this.selectedRound - 1];
      },
      // setter
      set: function(newValue) {
        return this.competition.rounds[this.selectedRound - 1];
      }
    }
  }
};
</script>
<style>
.centered-input input {
  text-align: center;
}
.editingTeam {
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>