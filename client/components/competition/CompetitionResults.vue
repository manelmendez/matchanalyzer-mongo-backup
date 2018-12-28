<template>
  <div>
    <div v-if="competition.rounds.length == 0">
      <v-card>
        <v-card-text class="text-xs-center">
          Aun no hay ninguna jornada disputada
          <br>
          <v-btn
            fab
            color="pink"
            dark>
            <i class="material-icons" @click="createRound()">add</i>
          </v-btn>
        </v-card-text>
      </v-card>
    </div>
    <div v-else>
      <v-card>
        <v-card-title>
          <v-flex xs3>
            <v-select
              :items="competition.rounds"
              item-text="name"
              item-value="_id"
              label=""
              v-model="round"
              required
              class="headline"
            ></v-select>
          </v-flex>
        </v-card-title>
        <v-card-text class="text-xs-center">
          <div v-if="competition.rounds[competition.rounds.length-1].matches.length == 0">
            Aún no has añadido partidos en esta jornada
          </div>
          <div v-else>
            <div v-for="match in competition.rounds[competition.rounds.length-1].matches" :key="match._id">
              <v-container grid-list-md>
                <v-layout row justify-center>
                  <v-flex xs4>
                    <div class="match elevation-2">
                      {{match.localTeam.name}}
                    </div>
                  </v-flex>
                  <v-flex xs2>
                    <div class="match elevation-2">
                      {{match.localTeamGoals}} - {{match.awayTeamGoals}}
                    </div>
                  </v-flex>
                  <v-flex xs4>
                    <div class="match elevation-2">
                      {{match.awayTeam.name}}
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </div>
          <br>
          <v-btn
            v-if="roundTeams.length != 0"
            fab
            color="pink"
            dark
            @click.stop="dialog=!dialog"
          >
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
                      <v-text-field class="centered-input" type="number" v-model="localGoals" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4 class="text-xs-center">
                      -
                    </v-flex>
                    <v-flex xs12 md4 class="text-xs-center">
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
                    return-object
                    required
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-btn color="primary" @click.native="createMatch()">Continue</v-btn>
          <v-btn flat @click.native="dialog=!dialog">Cancel</v-btn>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
  export default {
    name: "CompetitionResults",
    data: () => ({
      dialog: false,
      localGoals: 0,
      awayGoals: 0,
      team: '',
      team2: '',
    }),
    methods: {
      createRound() {
        let body = {
          round: {
            name: "Jornada "+(this.competition.rounds.length+1)
          },
          competition: this.competition._id
        }
        this.addRound(body)
      },
      createMatch() {
        let stats = this.setStats(this.team, this.team2)
        console.log(stats);
        let body = {
          match: {
            localTeam: this.team._id,
            awayTeam: this.team2._id,
            localTeamGoals: this.localGoals,
            awayTeamGoals: this.awayGoals,
            matchDay: Date.now(),
            competition: this.competition._id,
            round: this.competition.rounds[this.competition.rounds.length-1]._id,
          },
          localTeamStats: stats.localTeamStats,
          awayTeamStats: stats.awayTeamStats
        }
        if (this.team._id == this.team2._id) {
          alert("No puedes seleccionar el mismo equipo en ambos lados")
        }
        // else if (this.team._id == this.competition.myTeam._id || this.team2._id == this.competition.myTeam._id) {
        //   alert("Uno de ellos es tu equipo, rellena las estadísticas")
        // }
        else {
          this.addMatch(body).then((response) => {
            if (response.status == 200) {
              this.getCompetition(this.$route.params.id)
              this.clearDialog()
              this.dialog = false
            }
          })
        }
      },
      clearDialog() {
        this.team = ''
        this.team2 = ''
        this.localGoals = 0
        this.awayGoals = 0
      },
      setStats(team1, team2) {
        let stats = {
          localTeamStats: {},
          awayTeamStats: {}
        }
        let localTeamStats = {
          round: this.competition.rounds[this.competition.rounds.length-1]._id,
          points: (team1.stats.length == 0) ? 0:team1.stats[team1.stats.length -1].points,
          homePoints: (team1.stats.length == 0) ? 0:team1.stats[team1.stats.length -1].homePoints,
          awayPoints: (team1.stats.length == 0) ? 0:team1.stats[team1.stats.length -1].awayPoints,
          wins: (team1.stats.length == 0) ? 0:team1.stats[team1.stats.length -1].wins,
          homeWins: (team1.stats.length == 0) ? 0:team1.stats[team1.stats.length -1].homeWins,
          awayWins: (team1.stats.length == 0) ? 0:team1.stats[team1.stats.length -1].awayWins,
          draws: (team1.stats.length == 0) ? 0:team1.stats[team1.stats.length -1].draws,
          homeDraws: (team1.stats.length == 0) ? 0:team1.stats[team1.stats.length -1].homeDraws,
          awayDraws: (team1.stats.length == 0) ? 0:team1.stats[team1.stats.length -1].awayDraws,
          loses: (team1.stats.length == 0) ? 0:team1.stats[team1.stats.length -1].loses,
          homeLoses: (team1.stats.length == 0) ? 0:team1.stats[team1.stats.length -1].homeLoses,
          awayLoses: (team1.stats.length == 0) ? 0:team1.stats[team1.stats.length -1].awayLoses,
          goals: (team1.stats.length == 0) ? 0:team1.stats[team1.stats.length -1].goals,
          homeGoals: (team1.stats.length == 0) ? 0:team1.stats[team1.stats.length -1].homeGoals,
          awayGoals: (team1.stats.length == 0) ? 0:team1.stats[team1.stats.length -1].awayGoals,
          againstGoals: (team1.stats.length == 0) ? 0:team1.stats[team1.stats.length -1].againstGoals,
          homeAgainstGoals: (team1.stats.length == 0) ? 0:team1.stats[team1.stats.length -1].homeAgainstGoals,
          awayAgainstGoals: (team1.stats.length == 0) ? 0:team1.stats[team1.stats.length -1].awayAgainstGoals,
        }
        let awayTeamStats = {
          round: this.competition.rounds[this.competition.rounds.length-1]._id,
          points: (team2.stats.length == 0) ? 0:team2.stats[team2.stats.length -1].points,
          homePoints: (team2.stats.length == 0) ? 0:team2.stats[team2.stats.length -1].homePoints,
          awayPoints: (team2.stats.length == 0) ? 0:team2.stats[team2.stats.length -1].awayPoints,
          wins: (team2.stats.length == 0) ? 0:team2.stats[team2.stats.length -1].wins,
          homeWins: (team2.stats.length == 0) ? 0:team2.stats[team2.stats.length -1].homeWins,
          awayWins: (team2.stats.length == 0) ? 0:team2.stats[team2.stats.length -1].awayWins,
          draws: (team2.stats.length == 0) ? 0:team2.stats[team2.stats.length -1].draws,
          homeDraws: (team2.stats.length == 0) ? 0:team2.stats[team2.stats.length -1].homeDraws,
          awayDraws: (team2.stats.length == 0) ? 0:team2.stats[team2.stats.length -1].awayDraws,
          loses: (team2.stats.length == 0) ? 0:team2.stats[team2.stats.length -1].loses,
          homeLoses: (team2.stats.length == 0) ? 0:team2.stats[team2.stats.length -1].homeLoses,
          awayLoses: (team2.stats.length == 0) ? 0:team2.stats[team2.stats.length -1].awayLoses,
          goals: (team2.stats.length == 0) ? 0:team2.stats[team2.stats.length -1].goals,
          homeGoals: (team2.stats.length == 0) ? 0:team2.stats[team2.stats.length -1].homeGoals,
          awayGoals: (team2.stats.length == 0) ? 0:team2.stats[team2.stats.length -1].awayGoals,
          againstGoals: (team2.stats.length == 0) ? 0:team2.stats[team2.stats.length -1].againstGoals,
          homeAgainstGoals: (team2.stats.length == 0) ? 0:team2.stats[team2.stats.length -1].homeAgainstGoals,
          awayAgainstGoals: (team2.stats.length == 0) ? 0:team2.stats[team2.stats.length -1].awayAgainstGoals,
        }
        if(this.localGoals>this.awayGoals) {
          localTeamStats.points=localTeamStats.points + 3
          localTeamStats.homePoints=localTeamStats.homePoints + 3
          localTeamStats.awayPoints=localTeamStats.awayPoints + 0
          localTeamStats.wins=localTeamStats.wins + 1
          localTeamStats.homeWins=localTeamStats.homeWins + 1
          localTeamStats.awayWins=localTeamStats.awayWins + 0
          localTeamStats.draws=localTeamStats.draws + 0
          localTeamStats.homeDraws=localTeamStats.homeDraws + 0
          localTeamStats.awayDraws=localTeamStats.awayDraws + 0
          localTeamStats.loses=localTeamStats.loses + 0
          localTeamStats.homeLoses=localTeamStats.homeLoses + 0
          localTeamStats.awayLoses=localTeamStats.awayLoses + 0
          localTeamStats.goals=localTeamStats.goals + Number(this.localGoals)
          localTeamStats.homeGoals=localTeamStats.homeGoals + Number(this.localGoals)
          localTeamStats.awayGoals=localTeamStats.awayGoals + 0
          localTeamStats.againstGoals=localTeamStats.againstGoals + Number(this.awayGoals)
          localTeamStats.homeAgainstGoals=localTeamStats.homeAgainstGoals + Number(this.awayGoals)
          localTeamStats.awayAgainstGoals=localTeamStats.awayAgainstGoals + 0
          awayTeamStats.points=awayTeamStats.points + 0
          awayTeamStats.homePoints=awayTeamStats.homePoints + 0
          awayTeamStats.awayPoints=awayTeamStats.awayPoints + 0
          awayTeamStats.wins=awayTeamStats.wins + 0
          awayTeamStats.homeWins=awayTeamStats.homeWins + 0
          awayTeamStats.awayWins=awayTeamStats.awayWins + 0
          awayTeamStats.draws=awayTeamStats.draws + 0
          awayTeamStats.homeDraws=awayTeamStats.homeDraws + 0
          awayTeamStats.awayDraws=awayTeamStats.awayDraws + 0
          awayTeamStats.loses=awayTeamStats.loses + 1
          awayTeamStats.homeLoses=awayTeamStats.homeLoses + 0
          awayTeamStats.awayLoses=awayTeamStats.awayLoses + 1
          awayTeamStats.goals=awayTeamStats.goals + Number(this.awayGoals)
          awayTeamStats.homeGoals=awayTeamStats.homeGoals + 0
          awayTeamStats.awayGoals=awayTeamStats.awayGoals + Number(this.awayGoals)
          awayTeamStats.againstGoals=awayTeamStats.againstGoals + Number(this.localGoals)
          awayTeamStats.homeAgainstGoals=awayTeamStats.homeAgainstGoals + 0
          awayTeamStats.awayAgainstGoals=awayTeamStats.awayAgainstGoals + Number(this.localGoals)
        }
        else if (this.localGoals==this.awayGoals) {
          localTeamStats.points=localTeamStats.points + 1
          localTeamStats.homePoints=localTeamStats.homePoints + 1
          localTeamStats.awayPoints=localTeamStats.awayPoints + 0
          localTeamStats.wins=localTeamStats.wins + 0
          localTeamStats.homeWins=localTeamStats.homeWins + 0
          localTeamStats.awayWins=localTeamStats.awayWins + 0
          localTeamStats.draws=localTeamStats.draws + 1
          localTeamStats.homeDraws=localTeamStats.homeDraws + 1
          localTeamStats.awayDraws=localTeamStats.awayDraws + 0
          localTeamStats.loses=localTeamStats.loses + 0
          localTeamStats.homeLoses=localTeamStats.homeLoses + 0
          localTeamStats.awayLoses=localTeamStats.awayLoses + 0
          localTeamStats.goals=localTeamStats.goals + Number(this.localGoals)
          localTeamStats.homeGoals=localTeamStats.homeGoals + Number(this.localGoals)
          localTeamStats.awayGoals=localTeamStats.awayGoals + 0
          localTeamStats.againstGoals=localTeamStats.againstGoals + Number(this.awayGoals)
          localTeamStats.homeAgainstGoals=localTeamStats.homeAgainstGoals + Number(this.awayGoals)
          localTeamStats.awayAgainstGoals=localTeamStats.awayAgainstGoals + 0
          awayTeamStats.points=awayTeamStats.points + 1
          awayTeamStats.homePoints=awayTeamStats.homePoints + 0
          awayTeamStats.awayPoints=awayTeamStats.awayPoints + 1
          awayTeamStats.wins=awayTeamStats.wins + 0
          awayTeamStats.homeWins=awayTeamStats.homeWins + 0
          awayTeamStats.awayWins=awayTeamStats.awayWins + 0
          awayTeamStats.draws=awayTeamStats.draws + 1
          awayTeamStats.homeDraws=awayTeamStats.homeDraws + 0
          awayTeamStats.awayDraws=awayTeamStats.awayDraws + 1
          awayTeamStats.loses=awayTeamStats.loses + 0
          awayTeamStats.homeLoses=awayTeamStats.homeLoses + 0
          awayTeamStats.awayLoses=awayTeamStats.awayLoses + 0
          awayTeamStats.goals=awayTeamStats.goals + Number(this.awayGoals)
          awayTeamStats.homeGoals=awayTeamStats.homeGoals + 0
          awayTeamStats.awayGoals=awayTeamStats.awayGoals + Number(this.awayGoals)
          awayTeamStats.againstGoals=awayTeamStats.againstGoals + Number(this.localGoals)
          awayTeamStats.homeAgainstGoals=awayTeamStats.homeAgainstGoals + 0
          awayTeamStats.awayAgainstGoals=awayTeamStats.awayAgainstGoals + Number(this.localGoals)
        }
        else {
          localTeamStats.points=localTeamStats.points + 0
          localTeamStats.homePoints=localTeamStats.homePoints + 0
          localTeamStats.awayPoints=localTeamStats.awayPoints + 0
          localTeamStats.wins=localTeamStats.wins + 0
          localTeamStats.homeWins=localTeamStats.homeWins + 0
          localTeamStats.awayWins=localTeamStats.awayWins + 0
          localTeamStats.draws=localTeamStats.draws + 0
          localTeamStats.homeDraws=localTeamStats.homeDraws + 0
          localTeamStats.awayDraws=localTeamStats.awayDraws + 0
          localTeamStats.loses=localTeamStats.loses + 1
          localTeamStats.homeLoses=localTeamStats.homeLoses + 1
          localTeamStats.awayLoses=localTeamStats.awayLoses + 0
          localTeamStats.goals=localTeamStats.goals + Number(this.localGoals)
          localTeamStats.homeGoals=localTeamStats.homeGoals + Number(this.localGoals)
          localTeamStats.awayGoals=localTeamStats.awayGoals + 0
          localTeamStats.againstGoals=localTeamStats.againstGoals + Number(this.awayGoals)
          localTeamStats.homeAgainstGoals=localTeamStats.homeAgainstGoals + Number(this.awayGoals)
          localTeamStats.awayAgainstGoals=localTeamStats.awayAgainstGoals + 0
          awayTeamStats.points=awayTeamStats.points + 3
          awayTeamStats.homePoints=awayTeamStats.homePoints + 0
          awayTeamStats.awayPoints=awayTeamStats.awayPoints + 3
          awayTeamStats.wins=awayTeamStats.wins + 1
          awayTeamStats.homeWins=awayTeamStats.homeWins + 0
          awayTeamStats.awayWins=awayTeamStats.awayWins + 1
          awayTeamStats.draws=awayTeamStats.draws + 0
          awayTeamStats.homeDraws=awayTeamStats.homeDraws + 0
          awayTeamStats.awayDraws=awayTeamStats.awayDraws + 0
          awayTeamStats.loses=awayTeamStats.loses + 0
          awayTeamStats.homeLoses=awayTeamStats.homeLoses + 0
          awayTeamStats.awayLoses=awayTeamStats.awayLoses + 0
          awayTeamStats.goals=awayTeamStats.goals + Number(this.awayGoals)
          awayTeamStats.homeGoals=awayTeamStats.homeGoals + 0
          awayTeamStats.awayGoals=awayTeamStats.awayGoals + Number(this.awayGoals)
          awayTeamStats.againstGoals=awayTeamStats.againstGoals + Number(this.localGoals)
          awayTeamStats.homeAgainstGoals=awayTeamStats.homeAgainstGoals + 0
          awayTeamStats.awayAgainstGoals=awayTeamStats.awayAgainstGoals + Number(this.localGoals)
        }
        stats.localTeamStats = localTeamStats
        stats.awayTeamStats = awayTeamStats
        return stats
      },
      ...mapActions([
        'getCompetition',
        'addNoManagerTeam',
        'addRound',
        'addMatch'
      ])
    },
    computed: {
      ...mapGetters([
        'competition'
      ]),
      round() {
        return this.competition.rounds[this.competition.rounds.length -1]
      },
      roundTeams(){
        let actualCompetition = {...this.competition}
        let actualRound = {...actualCompetition.rounds[actualCompetition.rounds.length -1]}
        let actualRoundTeams = [...actualCompetition.teams]
        for (var i = 0; i < actualCompetition.teams.length; i++) {
          let found = false
          let j = 0
          while (j < actualRound.matches.length && !found) {
            if(actualCompetition.teams[i]._id == actualRound.matches[j].localTeam._id || actualCompetition.teams[i]._id == actualRound.matches[j].awayTeam._id){
              found = true
              var index = actualRoundTeams.map(x => {
                return x._id;
              }).indexOf(actualCompetition.teams[i]._id);
              actualRoundTeams.splice(index, 1);
            }
            j++
          }
        }
        return actualRoundTeams
      }
    }
  }
</script>
<style>
.centered-input input {
  text-align: center
}
.match {
  background-color: 'rgb(0, 255, 247)';
  color: 'rgb(201, 53, 165)';
  padding: 30px;
  margin-bottom: -15px;
}
</style>