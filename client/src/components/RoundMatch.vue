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
                <v-btn flat icon color="blue lighten-2" @click="roundDialog=!roundDialog">
                    <v-icon size="18">edit</v-icon>
                </v-btn>
                <v-btn flat icon color="red lighten-2" @click="deleteDialog=!deleteDialog">
                    <v-icon size="18">delete</v-icon>
                </v-btn>
            </div>
        </v-flex>
        <RoundModal v-if="roundDialog" :show="roundDialog" type="edit" :roundTeams="newRoundTeams" :match="match" @close="roundDialog=!roundDialog" @confirm="updateMatchFunction"></RoundModal>
        <DeleteModal v-if="deleteDialog" :show="deleteDialog" type="match" @close="deleteDialog=!deleteDialog" @delete="deleteMatchFunction"></DeleteModal>
    </v-layout>
</template>
<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import RoundModal from './modals/RoundModal'
import DeleteModal from './modals/DeleteModal'
export default {
    name: "RoundMatch",
    components:{
        DeleteModal,
        RoundModal
    }, 
    props: {
        match: Object,
        roundTeams: Array
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
                    deleteDialog=false
                }
            });
        },
        editMatch(match) {
            this.editingTeam = match.localTeam;
            this.editingTeam2 = match.awayTeam;
            this.editingLocalGoals = match.localTeamGoals;
            this.editingAwayGoals = match.awayTeamGoals;
            this.editingMatch = match._id;
            this.dialog2 = true;
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
            console.log(data);
            
            this.updateMatch(data).then(response => {
                if (response.status == 200) {
                    // this.getCompetition(this.$route.params.id)
                    this.roundDialog=false;
                }
            });
        },
        ...mapActions([
            "addMatch",
            "updateMatch",
            "deleteMatch",
        ])
    },
    computed: {
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
