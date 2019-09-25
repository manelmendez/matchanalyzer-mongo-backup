<template>
    <v-container grid-list-md >
        <RoundMatch v-for="match in matches" :key="match._id" :match="match" @loading="loading"></RoundMatch>
    </v-container>
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
        ...mapGetters("competition",["matches"])
    }
}
</script>
<style scoped>

</style>
