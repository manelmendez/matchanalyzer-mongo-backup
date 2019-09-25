<template>
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
                <v-btn text icon color="blue lighten-2" @click="roundDialog=!roundDialog">
                    <v-icon size="18">edit</v-icon>
                </v-btn>
                <v-btn text icon color="red lighten-2" @click="deleteDialog=!deleteDialog">
                    <v-icon size="18">delete</v-icon>
                </v-btn>
            </div>
        </v-flex>
        <CreateMatch v-if="roundDialog" :show="roundDialog" type="edit" :roundTeams="newRoundTeams" :match="match" @close="roundDialog=!roundDialog" @edit="updateMatchFunction"></CreateMatch>
        <DeleteMatch v-if="deleteDialog" :show="deleteDialog" type="match" @close="deleteDialog=!deleteDialog" @delete="deleteMatchFunction"></DeleteMatch>
    </v-layout>
</template>
<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import CreateMatch from "../components/modals/CreateMatch";
import DeleteMatch from "../components/modals/DeleteMatch";
export default {
    name: "RoundMatch",
    components:{
        CreateMatch,
        DeleteMatch
    }, 
    props: {
        match: Object,
    },
    data(){
        return{
            roundDialog: false,
            deleteDialog: false,
        }
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
                    this.getCompetition(this.$route.params.id)
                    this.deleteDialog=false
                }
                else{
                    this.deleteDialog=false
                    this.$emit('loading')
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
            this.$emit('loading')
            this.updateMatch(data).then(response => {
                if (response.status == 200) {
                    this.getCompetition(this.$route.params.id)
                    this.roundDialog=false
                    this.$emit('loading')
                }
                else{
                    this.roundDialog=false
                    this.$emit('loading')
                }
            });
        },
        ...mapActions("competition",[
            "updateMatch",
            "deleteMatch",
            "getCompetition"
        ])
    },
    computed: {
        ...mapGetters("competition",['selectedRound','roundTeams']),
        newRoundTeams() {
            return [...this.roundTeams, this.match.localTeam, this.match.awayTeam]
        }
    }
}
</script>
<style scoped>
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
.result {
  background-color: rgba(199, 199, 199, 0.55);
  height: 100%;
  width: 100%;
}
</style>
