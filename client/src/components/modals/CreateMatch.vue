<template>
  <v-dialog v-if="show" v-model="show" width="70%" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">{{headline}}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 md4>
              <v-select
                :items="roundTeams"
                item-text="name"
                return-object
                label="Elige equipo local"
                v-model="team"
                v-on:change="checkTeam"
                required
              ></v-select>
            </v-flex>
            <v-flex xs12 md4 class="text-center">
              Resultado
              <v-layout wrap>
                <v-flex xs12 md4 class="text-center">
                  <v-text-field class="centered-input" type="number" v-model="localGoals" required></v-text-field>
                </v-flex>
                <v-flex xs12 md4 class="text-center align-self-center">-</v-flex>
                <v-flex xs12 md4 class="text-center">
                  <v-text-field class="centered-input" type="number" v-model="awayGoals" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 md4>
              <v-select
                :items="roundTeams"
                item-text="name"
                return-object
                label="Elige equipo visitante"
                v-model="team2"
                v-on:change="checkTeam"
                required
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click.native="(type=='new')?confirm():edit()">Continue</v-btn>
        <v-btn text @click="close()">Cancel</v-btn>
      <v-card-actions>
      <CreateMatchDetails v-if="detailsModal" :show="detailsModal"></CreateMatchDetails>
    </v-card>
  </v-dialog>
  
</template>
<script>
import { mapGetters } from "vuex";
import CreateMatchDetails from "./CreateMatchDetails";
export default {
  name: "CreateMatch",
  components: {
    CreateMatchDetails
  },
  props: {
    show: Boolean,
    type: String,
    roundTeams: Array,
    match: Object,
    round: String,
  },
  data() {
    return {
      localGoals: this.type == "new" ? 0 : Number(this.match.localTeamGoals),
      awayGoals: this.type == "new" ? 0 : Number(this.match.awayTeamGoals),
      team: this.type == "new" ? "" : this.match.localTeam,
      team2: this.type == "new" ? "" : this.match.awayTeam,
      headline: this.type == "new" ? "Añadir Partido" : "Editar Partido",
      detailsModal: false
    };
  },
  methods: {
    checkTeam(team) {
      // console.log(team);
     
      //   if (team._id == this.competition.myTeam._id) {
      //     console.log("HOLA");
          
      //               this.detailsModal=false

      //     this.detailsModal=true
      //   }
      
    },
    close() {
      this.$emit("close");
    },
    confirm() {
      let stats = this.setStats(this.team, this.team2);
      let match = {
        localTeam: this.team._id,
        awayTeam: this.team2._id,
        localTeamGoals: Number(this.localGoals),
        awayTeamGoals: Number(this.awayGoals),
        matchDay: Date.now(),
        competition: this.competition._id,
        round: this.round
      };
      let newMatch = {
        match: match,
        localTeamStats: stats.localTeamStats,
        awayTeamStats: stats.awayTeamStats
      };
      this.$emit("confirm", newMatch);
    },
    edit() {
      let stats = this.setStats(this.team, this.team2);
      this.$emit("edit", stats);
    },
    setStats(team1, team2) {
      let stats = {
        localTeamStats: {},
        awayTeamStats: {}
      };
      let localTeamStats = {
        round: this.type == "new" ? this.round : this.match.round
      };
      let awayTeamStats = {
        round: this.type == "new" ? this.round : this.match.round
      };

      if (Number(this.localGoals) > Number(this.awayGoals)) {
        if (this.type == "edit") {
          localTeamStats._id = team1.stats[team1.stats.length - 1];
        }
        localTeamStats.gamesPlayed = 1;
        localTeamStats.homeGamesPlayed = 1;
        localTeamStats.awayGamesPlayed = 0;
        localTeamStats.points = 3;
        localTeamStats.homePoints = 3;
        localTeamStats.awayPoints = 0;
        localTeamStats.wins = 1;
        localTeamStats.homeWins = 1;
        localTeamStats.awayWins = 0;
        localTeamStats.draws = 0;
        localTeamStats.homeDraws = 0;
        localTeamStats.awayDraws = 0;
        localTeamStats.loses = 0;
        localTeamStats.homeLoses = 0;
        localTeamStats.awayLoses = 0;
        localTeamStats.goals = Number(this.localGoals);
        localTeamStats.homeGoals = Number(this.localGoals);
        localTeamStats.awayGoals = 0;
        localTeamStats.againstGoals = Number(this.awayGoals);
        localTeamStats.homeAgainstGoals = Number(this.awayGoals);
        localTeamStats.awayAgainstGoals = 0;
        if (this.type == "edit") {
          awayTeamStats._id = team2.stats[team2.stats.length - 1];
        }
        awayTeamStats.gamesPlayed = 1;
        awayTeamStats.homeGamesPlayed = 0;
        awayTeamStats.awayGamesPlayed = 1;
        awayTeamStats.points = 0;
        awayTeamStats.homePoints = 0;
        awayTeamStats.awayPoints = 0;
        awayTeamStats.wins = 0;
        awayTeamStats.homeWins = 0;
        awayTeamStats.awayWins = 0;
        awayTeamStats.draws = 0;
        awayTeamStats.homeDraws = 0;
        awayTeamStats.awayDraws = 0;
        awayTeamStats.loses = 1;
        awayTeamStats.homeLoses = 0;
        awayTeamStats.awayLoses = 1;
        awayTeamStats.goals = Number(this.awayGoals);
        awayTeamStats.homeGoals = 0;
        awayTeamStats.awayGoals = Number(this.awayGoals);
        awayTeamStats.againstGoals = Number(this.localGoals);
        awayTeamStats.homeAgainstGoals = 0;
        awayTeamStats.awayAgainstGoals = Number(this.localGoals);
      } else if (Number(this.localGoals) == Number(this.awayGoals)) {
        if (this.type == "edit") {
          localTeamStats._id = team1.stats[team1.stats.length - 1];
        }
        localTeamStats.gamesPlayed = 1;
        localTeamStats.homeGamesPlayed = 1;
        localTeamStats.awayGamesPlayed = 0;
        localTeamStats.points = 1;
        localTeamStats.homePoints = 1;
        localTeamStats.awayPoints = 0;
        localTeamStats.wins = 0;
        localTeamStats.homeWins = 0;
        localTeamStats.awayWins = 0;
        localTeamStats.draws = 1;
        localTeamStats.homeDraws = 1;
        localTeamStats.awayDraws = 0;
        localTeamStats.loses = 0;
        localTeamStats.homeLoses = 0;
        localTeamStats.awayLoses = 0;
        localTeamStats.goals = Number(this.localGoals);
        localTeamStats.homeGoals = Number(this.localGoals);
        localTeamStats.awayGoals = 0;
        localTeamStats.againstGoals = Number(this.awayGoals);
        localTeamStats.homeAgainstGoals = Number(this.awayGoals);
        localTeamStats.awayAgainstGoals = 0;
        if (this.type == "edit") {
          awayTeamStats._id = team2.stats[team2.stats.length - 1];
        }
        awayTeamStats.gamesPlayed = 1;
        awayTeamStats.homeGamesPlayed = 0;
        awayTeamStats.awayGamesPlayed = 1;
        awayTeamStats.points = 1;
        awayTeamStats.homePoints = 0;
        awayTeamStats.awayPoints = 1;
        awayTeamStats.wins = 0;
        awayTeamStats.homeWins = 0;
        awayTeamStats.awayWins = 0;
        awayTeamStats.draws = 1;
        awayTeamStats.homeDraws = 0;
        awayTeamStats.awayDraws = 1;
        awayTeamStats.loses = 0;
        awayTeamStats.homeLoses = 0;
        awayTeamStats.awayLoses = 0;
        awayTeamStats.goals = Number(this.awayGoals);
        awayTeamStats.homeGoals = 0;
        awayTeamStats.awayGoals = Number(this.awayGoals);
        awayTeamStats.againstGoals = Number(this.localGoals);
        awayTeamStats.homeAgainstGoals = 0;
        awayTeamStats.awayAgainstGoals = Number(this.localGoals);
      } else if (Number(this.localGoals) < Number(this.awayGoals)) {
        if (this.type == "edit") {
          localTeamStats._id = team1.stats[team1.stats.length - 1];
        }
        localTeamStats.gamesPlayed = 1;
        localTeamStats.homeGamesPlayed = 1;
        localTeamStats.awayGamesPlayed = 0;
        localTeamStats.points = 0;
        localTeamStats.homePoints = 0;
        localTeamStats.awayPoints = 0;
        localTeamStats.wins = 0;
        localTeamStats.homeWins = 0;
        localTeamStats.awayWins = 0;
        localTeamStats.draws = 0;
        localTeamStats.homeDraws = 0;
        localTeamStats.awayDraws = 0;
        localTeamStats.loses = 1;
        localTeamStats.homeLoses = 1;
        localTeamStats.awayLoses = 0;
        localTeamStats.goals = Number(this.localGoals);
        localTeamStats.homeGoals = Number(this.localGoals);
        localTeamStats.awayGoals = 0;
        localTeamStats.againstGoals = Number(this.awayGoals);
        localTeamStats.homeAgainstGoals = Number(this.awayGoals);
        localTeamStats.awayAgainstGoals = 0;
        if (this.type == "edit") {
          awayTeamStats._id = team2.stats[team2.stats.length - 1];
        }
        awayTeamStats.gamesPlayed = 1;
        awayTeamStats.homeGamesPlayed = 0;
        awayTeamStats.awayGamesPlayed = 1;
        awayTeamStats.points = 3;
        awayTeamStats.homePoints = 0;
        awayTeamStats.awayPoints = 3;
        awayTeamStats.wins = 1;
        awayTeamStats.homeWins = 0;
        awayTeamStats.awayWins = 1;
        awayTeamStats.draws = 0;
        awayTeamStats.homeDraws = 0;
        awayTeamStats.awayDraws = 0;
        awayTeamStats.loses = 0;
        awayTeamStats.homeLoses = 0;
        awayTeamStats.awayLoses = 0;
        awayTeamStats.goals = Number(this.awayGoals);
        awayTeamStats.homeGoals = 0;
        awayTeamStats.awayGoals = Number(this.awayGoals);
        awayTeamStats.againstGoals = Number(this.localGoals);
        awayTeamStats.homeAgainstGoals = 0;
        awayTeamStats.awayAgainstGoals = Number(this.localGoals);
      } else {
        alert("Ojo porque algo ha salido mal, se recomienda borrar el partido");
      }
      stats.localTeamStats = localTeamStats;
      stats.awayTeamStats = awayTeamStats;
      return stats;
    }
  },
  computed: {
    ...mapGetters("competition",["competition"])
  }
};
</script>
<style scoped>
</style>
