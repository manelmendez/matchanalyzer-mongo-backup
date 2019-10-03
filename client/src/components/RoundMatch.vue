<template>
  <v-row justify-center>
    <v-col cols=4>
      <v-card class="match elevation-2">
        <v-card-text
          class="text-center"
          :class="resultClass(match.localTeamGoals,match.awayTeamGoals)"
        >{{match.localTeam.name}}</v-card-text>
      </v-card>
    </v-col>
    <v-col cols=2>
      <v-card class="match elevation-2">
        <v-card-text
          class="text-center result"
        >{{match.localTeamGoals}} - {{match.awayTeamGoals}}</v-card-text>
      </v-card>
    </v-col>
    <v-col cols=4>
      <v-card class="match elevation-2">
        <v-card-text
          class="text-center"
          :class="resultClass(match.awayTeamGoals,match.localTeamGoals)"
        >{{match.awayTeam.name}}</v-card-text>
      </v-card>
    </v-col>
    <v-col cols=2>
      <v-card class="match-actions elevation-2">
        <v-card-text class="text-center">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn x-small text icon color="green lighten-2" @click.stop="roundDialog=true" v-on="on">
                <v-icon size="18">fa-file-alt</v-icon>
              </v-btn>
            </template>
            <span>Añadir stats</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn x-small text icon color="blue lighten-2" @click.stop="roundDialog=true" v-on="on">
                <v-icon size="18">edit</v-icon>
              </v-btn>
            </template>
            <span>Editar partido</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn x-small text icon color="red lighten-2" @click.stop="deleteDialog=true" v-on="on">
                <v-icon size="18">delete</v-icon>
              </v-btn>
            </template>
            <span>Eliminar partido</span>
          </v-tooltip>
        </v-card-text>
      </v-card>
    </v-col>
    <CreateMatch
      v-if="roundDialog"
      :show="roundDialog"
      type="edit"
      :roundTeams="newRoundTeams"
      :match="match"
      @close="roundDialog=!roundDialog"
      @edit="updateMatchFunction"
    ></CreateMatch>
    <DeleteMatch
      v-if="deleteDialog"
      :show="deleteDialog"
      type="match"
      @close="deleteDialog=!deleteDialog"
      @delete="deleteMatchFunction"
    ></DeleteMatch>
  </v-row>
</template>
<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import CreateMatch from "./modals/CreateMatch";
import DeleteMatch from "./modals/DeleteMatch";
export default {
  name: "RoundMatch",
  components: {
    CreateMatch,
    DeleteMatch
  },
  props: {
    match: Object
  },
  data() {
    return {
      roundDialog: false,
      deleteDialog: false
    };
  },
  methods: {
    resultClass(goals1, goals2) {
      if (goals1 == goals2) return "draw";
      else if (goals1 > goals2) return "victory";
      else return "lose";
    },
    deleteMatchFunction() {
      let body = {
        localTeamId: this.match.localTeam._id,
        awayTeamId: this.match.awayTeam._id,
        localTeamStatsId: this.match.localTeam.stats[this.selectedRound - 1],
        awayTeamStatsId: this.match.awayTeam.stats[this.selectedRound - 1],
        roundId: this.match.round
      };
      let data = {
        id: this.match._id,
        body: body
      };
      this.deleteMatch(data).then(response => {
        if (response.status == 200) {
          this.getCompetition(this.$route.params.id);
          this.deleteDialog = false;
        } else {
          this.deleteDialog = false;
          this.$emit("loading");
        }
      });
    },
    updateMatchFunction(stats) {
      let body = {
        match: {
          localTeam: this.match.localTeam._id,
          awayTeam: this.match.awayTeam._id,
          localTeamGoals: stats.localTeamStats.goals,
          awayTeamGoals: stats.awayTeamStats.goals,
          matchDay: Date.now(),
          competition: this.match.competition,
          round: this.match.round
        },
        localTeamStats: stats.localTeamStats,
        awayTeamStats: stats.awayTeamStats
      };
      let data = {
        id: this.match._id,
        body: body
      };
      this.$emit("loading");
      this.updateMatch(data).then(response => {
        if (response.status == 200) {
          this.getCompetition(this.$route.params.id);
          this.roundDialog = false;
          this.$emit("loading");
        } else {
          this.roundDialog = false;
          this.$emit("loading");
        }
      });
    },
    ...mapActions("competition", [
      "updateMatch",
      "deleteMatch",
      "getCompetition"
    ])
  },
  computed: {
    ...mapGetters("competition", ["selectedRound", "roundTeams"]),
    newRoundTeams() {
      return [...this.roundTeams, this.match.localTeam, this.match.awayTeam];
    }
  }
};
</script>
<style scoped>
.match {
  text-align: center;
  height: 100%;
}
.match-actions {
  text-align: center;
  height: 100%;
}
.victory {
  background-color: rgba(117, 255, 131, 0.55);
  height: 100%;
  width: 100%;
}
.draw {
  background-color: rgba(255, 216, 117, 0.55);
  height: 100%;
  width: 100%;
}
.lose {
  background-color: rgba(255, 117, 117, 0.55);
  height: 100%;
  width: 100%;
}
.result {
  background-color: rgba(199, 199, 199, 0.55);
  height: 100%;
  width: 100%;
}
</style>
