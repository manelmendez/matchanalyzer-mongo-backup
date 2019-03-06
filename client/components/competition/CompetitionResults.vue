<template>
  <div v-if="competition.rounds">
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
          <v-layout row justify-space-between>
          <v-flex xs3>
            <v-select
              :items="competition.rounds"
              item-text="name"
              item-value="_id"
              label=""
              v-model="round"
              required
              class="headline"
              v-on:change="changeResultRound()"
            ></v-select>
            </v-flex>
            <v-flex xs3>
            <v-btn v-if="roundTeams.length == 0"
              color="blue-grey"
              class="white--text"
              @click="createRound()"
            >
              Nueva Jornada
              <v-icon right dark>add</v-icon>
            </v-btn>
          </v-flex>
          </v-layout>
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
                    <v-flex xs12 md4 class="text-xs-center red">
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
        }
        let awayTeamStats = {
          round: this.competition.rounds[this.competition.rounds.length-1]._id,
        }
        if(Number(this.localGoals)>Number(this.awayGoals)) {
          localTeamStats.gamesPlayed= 1,
          localTeamStats.homeGamesPlayed= 1,
          localTeamStats.awayGamesPlayed= 0,
          localTeamStats.points= 3
          localTeamStats.homePoints= 3
          localTeamStats.awayPoints= 0
          localTeamStats.wins= 1
          localTeamStats.homeWins= 1
          localTeamStats.awayWins= 0
          localTeamStats.draws= 0
          localTeamStats.homeDraws= 0
          localTeamStats.awayDraws= 0
          localTeamStats.loses= 0
          localTeamStats.homeLoses= 0
          localTeamStats.awayLoses= 0
          localTeamStats.goals= Number(this.localGoals)
          localTeamStats.homeGoals= Number(this.localGoals)
          localTeamStats.awayGoals= 0
          localTeamStats.againstGoals= Number(this.awayGoals)
          localTeamStats.homeAgainstGoals= Number(this.awayGoals)
          localTeamStats.awayAgainstGoals= 0
          awayTeamStats.gamesPlayed= 1,
          awayTeamStats.homeGamesPlayed= 0,
          awayTeamStats.awayGamesPlayed= 1,
          awayTeamStats.points= 0
          awayTeamStats.homePoints= 0
          awayTeamStats.awayPoints= 0
          awayTeamStats.wins= 0
          awayTeamStats.homeWins= 0
          awayTeamStats.awayWins= 0
          awayTeamStats.draws= 0
          awayTeamStats.homeDraws= 0
          awayTeamStats.awayDraws= 0
          awayTeamStats.loses= 1
          awayTeamStats.homeLoses= 0
          awayTeamStats.awayLoses= 1
          awayTeamStats.goals= Number(this.awayGoals)
          awayTeamStats.homeGoals= 0
          awayTeamStats.awayGoals= Number(this.awayGoals)
          awayTeamStats.againstGoals= Number(this.localGoals)
          awayTeamStats.homeAgainstGoals= 0
          awayTeamStats.awayAgainstGoals= Number(this.localGoals)
        }
        else if (Number(this.localGoals)==Number(this.awayGoals)) {
          localTeamStats.gamesPlayed= 1,
          localTeamStats.homeGamesPlayed= 1,
          localTeamStats.awayGamesPlayed= 0,
          localTeamStats.points= 1
          localTeamStats.homePoints= 1
          localTeamStats.awayPoints= 0
          localTeamStats.wins= 0
          localTeamStats.homeWins= 0
          localTeamStats.awayWins= 0
          localTeamStats.draws= 1
          localTeamStats.homeDraws= 1
          localTeamStats.awayDraws= 0
          localTeamStats.loses= 0
          localTeamStats.homeLoses= 0
          localTeamStats.awayLoses= 0
          localTeamStats.goals= Number(this.localGoals)
          localTeamStats.homeGoals= Number(this.localGoals)
          localTeamStats.awayGoals= 0
          localTeamStats.againstGoals= Number(this.awayGoals)
          localTeamStats.homeAgainstGoals= Number(this.awayGoals)
          localTeamStats.awayAgainstGoals= 0
          awayTeamStats.gamesPlayed= 1,
          awayTeamStats.homeGamesPlayed= 0,
          awayTeamStats.awayGamesPlayed= 1,
          awayTeamStats.points= 1
          awayTeamStats.homePoints= 0
          awayTeamStats.awayPoints= 1
          awayTeamStats.wins= 0
          awayTeamStats.homeWins= 0
          awayTeamStats.awayWins= 0
          awayTeamStats.draws= 1
          awayTeamStats.homeDraws= 0
          awayTeamStats.awayDraws= 1
          awayTeamStats.loses= 0
          awayTeamStats.homeLoses= 0
          awayTeamStats.awayLoses= 0
          awayTeamStats.goals= Number(this.awayGoals)
          awayTeamStats.homeGoals= 0
          awayTeamStats.awayGoals= Number(this.awayGoals)
          awayTeamStats.againstGoals= Number(this.localGoals)
          awayTeamStats.homeAgainstGoals= 0
          awayTeamStats.awayAgainstGoals= Number(this.localGoals)
        }
        else if (Number(this.localGoals)<Number(this.awayGoals)) {
          localTeamStats.gamesPlayed= 1,
          localTeamStats.homeGamesPlayed= 1,
          localTeamStats.awayGamesPlayed= 0,
          localTeamStats.points= 0
          localTeamStats.homePoints= 0
          localTeamStats.awayPoints= 0
          localTeamStats.wins= 0
          localTeamStats.homeWins= 0
          localTeamStats.awayWins= 0
          localTeamStats.draws= 0
          localTeamStats.homeDraws= 0
          localTeamStats.awayDraws= 0
          localTeamStats.loses= 1
          localTeamStats.homeLoses= 1
          localTeamStats.awayLoses= 0
          localTeamStats.goals= Number(this.localGoals)
          localTeamStats.homeGoals= Number(this.localGoals)
          localTeamStats.awayGoals= 0
          localTeamStats.againstGoals= Number(this.awayGoals)
          localTeamStats.homeAgainstGoals= Number(this.awayGoals)
          localTeamStats.awayAgainstGoals= 0
          awayTeamStats.gamesPlayed= 1,
          awayTeamStats.homeGamesPlayed= 0,
          awayTeamStats.awayGamesPlayed= 1,
          awayTeamStats.points= 3
          awayTeamStats.homePoints= 0
          awayTeamStats.awayPoints= 3
          awayTeamStats.wins= 1
          awayTeamStats.homeWins= 0
          awayTeamStats.awayWins= 1
          awayTeamStats.draws= 0
          awayTeamStats.homeDraws= 0
          awayTeamStats.awayDraws= 0
          awayTeamStats.loses= 0
          awayTeamStats.homeLoses= 0
          awayTeamStats.awayLoses= 0
          awayTeamStats.goals= Number(this.awayGoals)
          awayTeamStats.homeGoals= 0
          awayTeamStats.awayGoals= Number(this.awayGoals)
          awayTeamStats.againstGoals= Number(this.localGoals)
          awayTeamStats.homeAgainstGoals= 0
          awayTeamStats.awayAgainstGoals= Number(this.localGoals)
        }
        else{
          alert("Ojo porque algo ha salido mal, se recomienda borrar el partido")
        }
        stats.localTeamStats = localTeamStats
        stats.awayTeamStats = awayTeamStats
        return stats
      },
      changeResultRound(){
        console.log(this.round);
        
        this.changeRound(this.round)
      },
      ...mapActions([
        'getCompetition',
        'addNoManagerTeam',
        'addRound',
        'addMatch',
        'changeRound'
      ])
    },
    computed: {
      ...mapGetters([
        'competition',
        'roundTeams'
      ]),
      round() {
        return this.competition.rounds[this.competition.rounds.length -1]
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