<template>
    <div class="roundResults">
        <v-container grid-list-md v-for="match in matches" :key="match._id">
            <RoundMatch :match="match" @loading="loading"></RoundMatch>
        </v-container>
    </div>
</template>
<script>
import RoundMatch from "./RoundMatch"
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
    name: "RoundMatches",
    components:{
        RoundMatch
    },
    methods: {
        loading(){
            this.$emit('loading')
        }
    },
    computed: {
        ...mapGetters(["matches"])
    }
}
</script>
<style scoped>

</style>
