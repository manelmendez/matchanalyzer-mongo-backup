<template>
  <v-app dark>
    <Layout v-if="isLogged"/>
    <router-view></router-view>
  </v-app>
</template>

<script>
  import Layout from './Layout.vue'
  import Welcome from './Welcome.vue'
  import { mapState } from 'vuex'
  export default {
    name: "App",
    components: {
      Welcome,
      Layout
    },
    data: () => ({
      drawer: true,
    }),
    computed: {
      ...mapState([
        'isLogged'
      ])
    }
  }

</script>

<style>
  .app{
    min-height: 100%;
    height: 100%;
  }
</style>