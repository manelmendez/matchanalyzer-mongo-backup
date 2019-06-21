<template>
  <v-app dark>
    <div v-if="isLogged">
      <Layout>
    </div>
    <div v-else>
      <Login>
    </div>
  </v-app>
</template>

<script>
import Layout from '../layouts/Layout.vue'
import Login from './login.vue'
  import { mapGetters } from 'vuex'
  export default {
    name: "App",
    components: {
      Layout,
      Login
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
