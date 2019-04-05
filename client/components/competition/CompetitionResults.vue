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
                @click.stop="dialog4=!dialog4"
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
            <div v-for="match in competition.rounds[selectedRound -1].matches" :key="match._id">
              <v-container grid-list-md>
                <v-layout row justify-center>
                  <v-flex xs4>
                    <v-card class="match elevation-2">
                      <v-card-text
                        class="text-xs-center"
                        :class="resultClass(match.localTeamGoals,match.awayTeamGoals)"
                      >{{match.localTeam.name}}</v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs2>
                    <v-card class="match elevation-2">
                      <v-card-text
                        class="text-xs-center result"
                      >{{match.localTeamGoals}} - {{match.awayTeamGoals}}</v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs4>
                    <v-card class="match elevation-2">
                      <v-card-text
                        class="text-xs-center"
                        :class="resultClass(match.awayTeamGoals,match.localTeamGoals)"
                      >{{match.awayTeam.name}}</v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs2>
                    <div class="match elevation-2">
                      <v-btn flat icon color="blue lighten-2" @click="editMatch(match)">
                        <v-icon size="18">edit</v-icon>
                      </v-btn>
                      <v-btn flat icon color="red lighten-2" @click="delMatch(match)">
                        <v-icon size="18">delete</v-icon>
                      </v-btn>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </div>
          <br>
          <v-btn v-if="roundTeams.length != 0" fab color="pink" dark @click.stop="dialog=!dialog">
            <i class="material-icons">add</i>
          </v-btn>
        </v-card-text>
      </v-card>
      <v-dialog v-model="dialog" width="70%" persistent>
        <v-card>
          <v-card-title>
            <span class="headline">Añadir Partido</span>
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
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs12 md4 class="text-xs-center">
                  Resultado
                  <v-layout wrap>
                    <v-flex xs12 md4 class="text-xs-center">
                      <v-text-field
                        class="centered-input"
                        type="number"
                        v-model="localGoals"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4 class="text-xs-center align-self-center">-</v-flex>
                    <v-flex xs12 md4 class="text-xs-center">
                      <v-text-field
                        class="centered-input"
                        type="number"
                        v-model="awayGoals"
                        required
                      ></v-text-field>
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
                    required
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-btn color="primary" @click.native="createMatch()">Continue</v-btn>
          <v-btn flat @click.native="clearDialog()">Cancel</v-btn>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog2" width="70%" persistent>
        <v-card>
          <v-card-title>
            <span class="headline">Editar Partido</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 md4 class="text-xs-center align-self-center">
                  <div>{{editingTeam.name}}</div>
                </v-flex>
                <v-flex xs12 md4 class="text-xs-center">
                  Resultado
                  <v-layout wrap>
                    <v-flex xs12 md4 class="text-xs-center">
                      <v-text-field
                        class="centered-input"
                        type="number"
                        v-model="editingLocalGoals"
                        :value="editingLocalGoals"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4 class="text-xs-center align-self-center">-</v-flex>
                    <v-flex xs12 md4 class="text-xs-center">
                      <v-text-field
                        class="centered-input"
                        type="number"
                        v-model="editingAwayGoals"
                        :value="editingAwayGoals"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 md4 class="text-xs-center align-self-center">
                  <div>
                    <p>{{editingTeam2.name}}</p>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-btn color="primary" @click.native="updateMatchFunction()">Edit</v-btn>
          <v-btn flat @click.native="clearDialog()">Cancel</v-btn>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog3" max-width="290">
        <v-card>
          <v-card-title class="headline">Quieres borrar este partido?</v-card-title>
          <v-card-text>Si aceptas, el partido se borrará y se perderán todos sus datos. Quieres continuar?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click="dialog3 = false">Atras</v-btn>
            <v-btn color="green darken-1" flat="flat" @click="deleteMatchFunction">Adelante</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog4" max-width="290">
        <v-card>
          <v-card-title class="headline">Quieres borrar esta jornada?</v-card-title>
          <v-card-text>Si aceptas, la jornada se borrará y se perderán todos sus partidos y datos estadísticos. Quieres continuar?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click="dialog4 = false">Atras</v-btn>
            <v-btn color="green darken-1" flat="flat" @click="deleteRoundFunction">Adelante</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "CompetitionResults",
  data: () => ({
    dialog: false,
    dialog2: false,
    dialog3: false,
    dialog4: false,
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
    editMatch(match) {
      this.editingTeam = match.localTeam;
      this.editingTeam2 = match.awayTeam;
      this.editingLocalGoals = match.localTeamGoals;
      this.editingAwayGoals = match.awayTeamGoals;
      this.editingMatch = match._id;
      this.dialog2 = true;
    },
    delMatch(match) {
      this.deletingMatch = match;
      this.dialog3 = true;
    },
    updateMatchFunction() {
      let stats = this.setStats(this.editingTeam, this.editingTeam2);
      let body = {
        match: {
          localTeam: this.editingTeam._id,
          awayTeam: this.editingTeam2._id,
          localTeamGoals: this.editingLocalGoals,
          awayTeamGoals: this.editingAwayGoals,
          matchDay: Date.now(),
          competition: this.competition._id,
          round: this.competition.rounds[this.selectedRound - 1]._id
        },
        localTeamStats: stats.localTeamStats,
        awayTeamStats: stats.awayTeamStats
      };
      let data = {
        id: this.editingMatch,
        body: body
      };
      this.updateMatch(data).then(response => {
        if (response.status == 200) {
          // this.getCompetition(this.$route.params.id)
          this.clearDialog();
        }
      });
    },
    deleteMatchFunction() {
      let body = {
        localTeamId: this.deletingMatch.localTeam._id,
        awayTeamId: this.deletingMatch.awayTeam._id,
        localTeamStatsId: this.deletingMatch.localTeam.stats[
          this.selectedRound - 1
        ],
        awayTeamStatsId: this.deletingMatch.awayTeam.stats[
          this.selectedRound - 1
        ],
        roundId: this.competition.rounds[this.selectedRound - 1]._id
      };
      let data = {
        id: this.deletingMatch._id,
        body: body
      };
      console.log(data);
      this.deleteMatch(data).then(response => {
        if (response.status == 200) {
          this.clearDialog();
        }
      });
    },
    clearDialog() {
      this.team = "";
      this.team2 = "";
      this.localGoals = 0;
      this.awayGoals = 0;
      this.dialog = false;
      this.dialog2 = false;
      this.dialog3 = false;
      this.dialog4 = false;
    },
    setStats(team1, team2) {
      let stats = {
        localTeamStats: {},
        awayTeamStats: {}
      };
      let localTeamStats = {
        round: this.competition.rounds[this.selectedRound - 1]._id
      };
      let awayTeamStats = {
        round: this.competition.rounds[this.selectedRound - 1]._id
      };
      if (
        (this.dialog2
          ? Number(this.editingLocalGoals)
          : Number(this.localGoals)) >
        (this.dialog2 ? Number(this.editingAwayGoals) : Number(this.awayGoals))
      ) {
        if (this.dialog2) {
          localTeamStats._id = this.editingTeam.stats[
            this.editingTeam.stats.length - 1
          ];
        }
        (localTeamStats.gamesPlayed = 1),
          (localTeamStats.homeGamesPlayed = 1),
          (localTeamStats.awayGamesPlayed = 0),
          (localTeamStats.points = 3);
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
        localTeamStats.goals = this.dialog2
          ? Number(this.editingLocalGoals)
          : Number(this.localGoals);
        localTeamStats.homeGoals = this.dialog2
          ? Number(this.editingLocalGoals)
          : Number(this.localGoals);
        localTeamStats.awayGoals = 0;
        localTeamStats.againstGoals = this.dialog2
          ? Number(this.editingAwayGoals)
          : Number(this.awayGoals);
        localTeamStats.homeAgainstGoals = this.dialog2
          ? Number(this.editingAwayGoals)
          : Number(this.awayGoals);
        localTeamStats.awayAgainstGoals = 0;
        if (this.dialog2) {
          awayTeamStats._id = this.editingTeam2.stats[
            this.editingTeam2.stats.length - 1
          ];
        }
        (awayTeamStats.gamesPlayed = 1),
          (awayTeamStats.homeGamesPlayed = 0),
          (awayTeamStats.awayGamesPlayed = 1),
          (awayTeamStats.points = 0);
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
        awayTeamStats.goals = this.dialog2
          ? Number(this.editingAwayGoals)
          : Number(this.awayGoals);
        awayTeamStats.homeGoals = 0;
        awayTeamStats.awayGoals = this.dialog2
          ? Number(this.editingAwayGoals)
          : Number(this.awayGoals);
        awayTeamStats.againstGoals = this.dialog2
          ? Number(this.editingLocalGoals)
          : Number(this.localGoals);
        awayTeamStats.homeAgainstGoals = 0;
        awayTeamStats.awayAgainstGoals = this.dialog2
          ? Number(this.editingLocalGoals)
          : Number(this.localGoals);
      } else if (
        (this.dialog2
          ? Number(this.editingLocalGoals)
          : Number(this.localGoals)) ==
        (this.dialog2 ? Number(this.editingAwayGoals) : Number(this.awayGoals))
      ) {
        if (this.dialog2) {
          localTeamStats._id = this.editingTeam.stats[
            this.editingTeam.stats.length - 1
          ];
        }
        (localTeamStats.gamesPlayed = 1),
          (localTeamStats.homeGamesPlayed = 1),
          (localTeamStats.awayGamesPlayed = 0),
          (localTeamStats.points = 1);
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
        localTeamStats.goals = this.dialog2
          ? Number(this.editingLocalGoals)
          : Number(this.localGoals);
        localTeamStats.homeGoals = this.dialog2
          ? Number(this.editingLocalGoals)
          : Number(this.localGoals);
        localTeamStats.awayGoals = 0;
        localTeamStats.againstGoals = this.dialog2
          ? Number(this.editingAwayGoals)
          : Number(this.awayGoals);
        localTeamStats.homeAgainstGoals = this.dialog2
          ? Number(this.editingAwayGoals)
          : Number(this.awayGoals);
        localTeamStats.awayAgainstGoals = 0;
        if (this.dialog2) {
          awayTeamStats._id = this.editingTeam2.stats[
            this.editingTeam2.stats.length - 1
          ];
        }
        (awayTeamStats.gamesPlayed = 1),
          (awayTeamStats.homeGamesPlayed = 0),
          (awayTeamStats.awayGamesPlayed = 1),
          (awayTeamStats.points = 1);
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
        awayTeamStats.goals = this.dialog2
          ? Number(this.editingAwayGoals)
          : Number(this.awayGoals);
        awayTeamStats.homeGoals = 0;
        awayTeamStats.awayGoals = this.dialog2
          ? Number(this.editingAwayGoals)
          : Number(this.awayGoals);
        awayTeamStats.againstGoals = this.dialog2
          ? Number(this.editingLocalGoals)
          : Number(this.localGoals);
        awayTeamStats.homeAgainstGoals = 0;
        awayTeamStats.awayAgainstGoals = this.dialog2
          ? Number(this.editingLocalGoals)
          : Number(this.localGoals);
      } else if (
        (this.dialog2
          ? Number(this.editingLocalGoals)
          : Number(this.localGoals)) <
        (this.dialog2 ? Number(this.editingAwayGoals) : Number(this.awayGoals))
      ) {
        if (this.dialog2) {
          localTeamStats._id = this.editingTeam.stats[
            this.editingTeam.stats.length - 1
          ];
        }
        (localTeamStats.gamesPlayed = 1),
          (localTeamStats.homeGamesPlayed = 1),
          (localTeamStats.awayGamesPlayed = 0),
          (localTeamStats.points = 0);
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
        localTeamStats.goals = this.dialog2
          ? Number(this.editingLocalGoals)
          : Number(this.localGoals);
        localTeamStats.homeGoals = this.dialog2
          ? Number(this.editingLocalGoals)
          : Number(this.localGoals);
        localTeamStats.awayGoals = 0;
        localTeamStats.againstGoals = this.dialog2
          ? Number(this.editingAwayGoals)
          : Number(this.awayGoals);
        localTeamStats.homeAgainstGoals = this.dialog2
          ? Number(this.editingAwayGoals)
          : Number(this.awayGoals);
        localTeamStats.awayAgainstGoals = 0;
        if (this.dialog2) {
          awayTeamStats._id = this.editingTeam2.stats[
            this.editingTeam2.stats.length - 1
          ];
        }
        (awayTeamStats.gamesPlayed = 1),
          (awayTeamStats.homeGamesPlayed = 0),
          (awayTeamStats.awayGamesPlayed = 1),
          (awayTeamStats.points = 3);
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
        awayTeamStats.goals = this.dialog2
          ? Number(this.editingAwayGoals)
          : Number(this.awayGoals);
        awayTeamStats.homeGoals = 0;
        awayTeamStats.awayGoals = this.dialog2
          ? Number(this.editingAwayGoals)
          : Number(this.awayGoals);
        awayTeamStats.againstGoals = this.dialog2
          ? Number(this.editingLocalGoals)
          : Number(this.localGoals);
        awayTeamStats.homeAgainstGoals = 0;
        awayTeamStats.awayAgainstGoals = this.dialog2
          ? Number(this.editingLocalGoals)
          : Number(this.localGoals);
      } else {
        alert("Ojo porque algo ha salido mal, se recomienda borrar el partido");
      }
      stats.localTeamStats = localTeamStats;
      stats.awayTeamStats = awayTeamStats;
      return stats;
    },
    changeResultRound(item) {
      //coger el numero de round y ponerlo en selectedRound
      let str = item.name;
      var res = str.split(" ");
      this.changeRound(res[1]);
    },
    resultClass(goals1, goals2) {
      if (goals1 == goals2) return "draw";
      else if (goals1 > goals2) return "victory";
      else return "lose";
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
          this.clearDialog()
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
.match {
  height: 100%;
  background-color: "rgb(0, 255, 247)";
  color: "rgb(201, 53, 165)";
  align-items: center;
  justify-content: center;
  text-align: center;
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
.editingTeam {
  align-items: center;
  justify-content: center;
  text-align: center;
}
.result {
  background-color: rgba(199, 199, 199, 0.55);
  height: 100%;
  width: 100%;
}
</style>