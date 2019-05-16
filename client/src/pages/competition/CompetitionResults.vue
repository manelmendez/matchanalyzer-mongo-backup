<template>
  <div v-if="competition.rounds && selectedRound!=null">
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
        <v-card-text class="text-xs-center">
          <div
            v-if="competition.rounds[selectedRound -1].matches.length == 0"
          >Aún no has añadido partidos en esta jornada</div>
          <div v-else>
            {{matches}}
            ------
            ------
            ------
            <RoundMatches :matches="matches" :roundTeams="roundTeams"></RoundMatches>
          </div>
          <br>
          <v-btn v-if="roundTeams.length != 0" fab color="pink" dark @click.stop="roundDialog=!roundDialog, roundType='new'">
            <i class="material-icons">add</i>
          </v-btn>
        </v-card-text>
      </v-card>
      <RoundModal :show="roundDialog" type="new" :roundTeams="roundTeams" @close="roundDialog=!roundDialog"></RoundModal>
      <DeleteModal :show="deleteDialog" type="jornada" @close="deleteDialog=!deleteDialog" @confirm="deleteRoundFunction"></DeleteModal>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import RoundMatches from "../../components/RoundMatches"
import DeleteModal from "../../components/modals/DeleteModal"
import RoundModal from "../../components/modals/RoundModal"
export default {
  name: "CompetitionResults",
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
    team: "",
    team2: "",
    editingTeam: "",
    editingTeam2: "",
    editingLocalGoals: 0,
    editingAwayGoals: 0,
    editingMatch: "",
    deletingMatch: ""
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
    createMatch() {
      let stats = this.setStats(this.team, this.team2);
      let body = {
        match: {
          localTeam: this.team._id,
          awayTeam: this.team2._id,
          localTeamGoals: this.localGoals,
          awayTeamGoals: this.awayGoals,
          matchDay: Date.now(),
          competition: this.competition._id,
          round: this.competition.rounds[this.selectedRound - 1]._id
        },
        localTeamStats: stats.localTeamStats,
        awayTeamStats: stats.awayTeamStats
      };
      console.log(body);
      if (this.team._id == this.team2._id) {
        alert("No puedes seleccionar el mismo equipo en ambos lados");
      }
      // else if (this.team._id == this.competition.myTeam._id || this.team2._id == this.competition.myTeam._id) {
      //   alert("Uno de ellos es tu equipo, rellena las estadísticas")
      // }
      else {
        this.addMatch(body).then(response => {
          if (response.status == 200) {
            this.clearDialog();
            this.dialog = false;
          }
        });
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
      console.log(data);
      this.deleteRound(data).then(response => {
        if (response.status == 200) {
          this.getCompetition(this.$route.params.id);
          this.deleteDialog=false
        }
      });
    },
    ...mapActions([
      "getCompetition",
      "addNoManagerTeam",
      "addRound",
      "addMatch",
      "changeRound",
      "updateMatch",
      "deleteMatch",
      "deleteRound"
    ])
  },
  computed: {
    ...mapGetters(["competition", "roundTeams", "selectedRound"]),
    matches() {
      console.log(this.$store.getters.matches);
      
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