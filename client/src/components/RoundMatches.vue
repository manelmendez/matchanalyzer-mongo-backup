<template>
    <div class="roundResults">
        {{matches[7].localTeamGoals}}
        <v-container grid-list-md v-for="match in matches" :key="match._id">
            {{match.localTeamGoals}}
            <RoundMatch :match="match" :roundTeams="roundTeams"></RoundMatch>
        </v-container>
    </div>
</template>
<script>
import RoundMatch from "./RoundMatch"
export default {
    name: "RoundMatches",
    components:{
        RoundMatch
    },
    props: {
        matches: Array,
        roundTeams: Array
    }
}
</script>
<style scoped>

</style>
