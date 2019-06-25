<template>
  <v-app dark>
    <div v-if="isLogged">
      <Layout>
    </div>
    <div v-else>
      <Login>
    </div>
    <Snackbar v-if="snackbar.show" :show="snackbar.show" :color="snackbar.color" :text="snackbar.text"></Snackbar>
  </v-app>
</template>

<script>
import Layout from '../layouts/Layout.vue'
import Login from './login.vue'
import Snackbar from '../components/flashmessages/Snackbar'

  import { mapGetters } from 'vuex'
  export default {
    name: "App",
    components: {
      Layout,
      Login,
      Snackbar
    },
    data: () => ({
      drawer: true,
    }),
    computed: {
      ...mapGetters([
        'isLogged',
        'snackbar'
      ]),

    }
  }

</script>

<style>
  .app{
    min-height: 100%;
    height: 100%;
  }
</style>
