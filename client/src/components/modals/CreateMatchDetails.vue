<template>
  <v-dialog v-if="show" v-model="show" width="70%" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">HOLA</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap></v-layout>
        </v-container>
      </v-card-text>
      <v-btn color="primary">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    show: Boolean
  }
}
</script>
