<template>
  <v-snackbar
    v-model="show"
    :bottom="true"
    :left="true"
    :color="color"
  >
    {{ text }}
    <v-btn
      color="black"
      text
      @click="close"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>
<script>
export default {
  props: {
    show: Boolean,
    text: String,
    color: String
  },
  methods: {
    close() {
      this.$store.commit('root/SNACKBAR_OFF')
    }
  },
  created() {
  }
}
</script>
<style scoped>

</style>
