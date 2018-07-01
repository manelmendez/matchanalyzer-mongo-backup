<template>
  <v-content>
  <!-- component matched by the route will render here -->
    <v-container>
      <p>AJUSTES</p>

      <v-btn
        fab
        color="pink"
        dark
        bottom
        right
        fixed
      >
        <i class="material-icons">add</i>
      </v-btn>
    </v-container>
  </v-content>
</template>

<script>
  export default {
    name: "Settings",
    data: () => ({

    })
  }
</script>
