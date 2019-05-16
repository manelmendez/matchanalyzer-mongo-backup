<template>
  <v-app dark>
    <div v-if="isLogged">
      <Layout>
    </div>
    <div v-else>
      <Welcome>
    </div>
  </v-app>
</template>

<script>
import Layout from '../layouts/Layout.vue'
import Welcome from './Welcome.vue'
  import { mapGetters } from 'vuex'
  export default {
    name: "App",
    components: {
      Layout,
      Welcome
    },
    data: () => ({
      drawer: true,
    }),
    computed: {
      ...mapGetters([
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
