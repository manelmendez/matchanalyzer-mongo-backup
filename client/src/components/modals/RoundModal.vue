<template>
    <v-dialog v-model="show" width="70%" persistent>
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
          <v-btn color="primary" @click.native="confirm()">Continue</v-btn>
          <v-btn flat @click="close()">Cancel</v-btn>
        </v-card>
      </v-dialog>
</template>
<script>
export default {
    name:"RoundModal",
    props: {
        show: Boolean,
        type: String,
        roundTeams: Array,
        match: Object
    },
    data(){
        return{
            localGoalsFix: 0,
            awayGoalsFix: 0
        }
    },
    computed: {
        headline() {
            if(this.type == "new") return "Añadir Partido"
            else if(this.type == "edit") return "Editar Partido"
        },
        team:{
            get(){ 
                if(this.type == "new") return {}
                else if(this.type == "edit") {
                    return this.match.localTeam}
            },
            set(value){
                return value
            }
        },
        team2:{
            get(){ 
                if(this.type == "new") return {}
                else if(this.type == "edit") return this.match.awayTeam
            },
            set(value){
                return value
            }
        },
        localGoals: {
            get() {
                if(this.type == "new") return 0
                else if(this.type == "edit") {
                    this.localGoalsFix = Number(this.match.localTeamGoals)
                    return this.match.localTeamGoals
                }
            },
            set(value) {
                this.localGoalsFix = Number(value)
                return Number(value)
            }
        },
        awayGoals:{
            get(){
                if(this.type == "new") return 0
                else if(this.type == "edit") {
                    this.awayGoalsFix = Number(this.match.awayTeamGoals)
                    return this.match.awayTeamGoals  
                }
            },
            set(value){
                this.awayGoalsFix = Number(value)
                return Number(value)
            }
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        confirm(){
            this.$emit('confirm', this.setStats(this.team,this.team2))
        },
        setStats(team1, team2) {            
            let stats = {
                localTeamStats: {},
                awayTeamStats: {}
            };
            let localTeamStats = {
                round: this.match.round
            };
            let awayTeamStats = {
                round: this.match.round
            };
          
            if ((Number(this.localGoalsFix)) > Number(this.awayGoalsFix))
            {
                if ((this.type=="edit")) {
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
                localTeamStats.goals = Number(this.localGoalsFix);
                localTeamStats.homeGoals = Number(this.localGoalsFix);
                localTeamStats.awayGoals = 0;
                localTeamStats.againstGoals = Number(this.awayGoalsFix);
                localTeamStats.homeAgainstGoals = Number(this.awayGoalsFix);
                localTeamStats.awayAgainstGoals = 0;
                if ((this.type=="edit")) {
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
                awayTeamStats.goals = Number(this.awayGoalsFix);
                awayTeamStats.homeGoals = 0;
                awayTeamStats.awayGoals = Number(this.awayGoalsFix);
                awayTeamStats.againstGoals = Number(this.localGoalsFix);
                awayTeamStats.homeAgainstGoals = 0;
                awayTeamStats.awayAgainstGoals = Number(this.localGoalsFix);
            } 
            else if (Number(this.localGoalsFix) == Number(this.awayGoalsFix)) {
                if ((this.type=="edit")) {
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
                localTeamStats.goals = Number(this.localGoalsFix);
                localTeamStats.homeGoals = Number(this.localGoalsFix);
                localTeamStats.awayGoals = 0;
                localTeamStats.againstGoals = Number(this.awayGoalsFix);
                localTeamStats.homeAgainstGoals = Number(this.awayGoalsFix);
                localTeamStats.awayAgainstGoals = 0;
                if ((this.type=="edit")) {
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
                awayTeamStats.goals = Number(this.awayGoalsFix);
                awayTeamStats.homeGoals = 0;
                awayTeamStats.awayGoals = Number(this.awayGoalsFix);
                awayTeamStats.againstGoals = Number(this.localGoalsFix);
                awayTeamStats.homeAgainstGoals = 0;
                awayTeamStats.awayAgainstGoals = Number(this.localGoalsFix);
            } 
            else if (Number(this.localGoalsFix) < Number(this.awayGoalsFix)){
                if ((this.type=="edit")) {
                    localTeamStats._id = team1.stats[team1.stats.length - 1];
                }
                localTeamStats.gamesPlayed = 1;
                localTeamStats.homeGamesPlayed = 1;
                localTeamStats.awayGamesPlayed = 0;
                localTeamStats.points = 0 ;
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
                localTeamStats.goals = Number(this.localGoalsFix);
                localTeamStats.homeGoals = Number(this.localGoalsFix);
                localTeamStats.awayGoals = 0;
                localTeamStats.againstGoals = Number(this.awayGoalsFix);
                localTeamStats.homeAgainstGoals = Number(this.awayGoalsFix);
                localTeamStats.awayAgainstGoals = 0;
                if ((this.type=="edit")) {
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
                awayTeamStats.goals = Number(this.awayGoalsFix);
                awayTeamStats.homeGoals = 0;
                awayTeamStats.awayGoals = Number(this.awayGoalsFix);
                awayTeamStats.againstGoals = Number(this.localGoalsFix);
                awayTeamStats.homeAgainstGoals = 0;
                awayTeamStats.awayAgainstGoals = Number(this.localGoalsFix);
            } 
            else {
                alert("Ojo porque algo ha salido mal, se recomienda borrar el partido");
            }
            stats.localTeamStats = localTeamStats;
            stats.awayTeamStats = awayTeamStats;
            console.log(stats);
            
            return stats;
        },
    }
}
</script>
<style scoped>

</style>
