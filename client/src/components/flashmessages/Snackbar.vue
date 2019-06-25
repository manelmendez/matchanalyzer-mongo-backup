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
      flat
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
      this.$emit('close')
    }
  },
  created() {
  }
}
</script>
<style scoped>

</style>
