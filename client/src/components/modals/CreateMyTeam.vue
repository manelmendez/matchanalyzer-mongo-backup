<template>
  <v-dialog v-if="show" v-model="show" width="50%" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">Datos del equipo:</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 md4 class="text-xs-center">
              <input type="file" ref="file" @change="onFileChanged" style="display:none">
              <v-avatar size="100px" v-if="!image" class="uploadPhoto" @click="launchFilePicker">
                <v-icon>add_a_photo</v-icon>
              </v-avatar>
              <v-avatar size="100px" v-else class="uploadPhoto" @click="launchFilePicker">
                <img :src="this.image" alt="avatar">
              </v-avatar>
            </v-flex>
            <v-flex xs12 md4>
              <v-text-field label="Nombre del equipo" v-model="name" required></v-text-field>
            </v-flex>
            <v-flex xs12 md4>
              <v-select
                :items="temporada"
                label="Temporada"
                v-model="season"
                required
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-btn color="primary" @click.native="createTeam()">Continue</v-btn>
      <v-btn text @click.native="close">Cancel</v-btn>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props:{
    show: Boolean
  },
  data:() => ({
    image:null,
    file: null,
    temporada: [
      "14/15",
      "15/16",
      "16/17",
      "17/18",
      "18/19"
    ],
    name: '',
    season: ''
  }),
  methods: {
    launchFilePicker(){
      this.$refs.file.click();
    },
    onFileChanged (event) {
      this.image = URL.createObjectURL(event.target.files[0])
      this.file = event.target.files[0]
    },
    createTeam() {
      if(this.file!=null){
        const fd = new FormData()
        fd.append('image', this.file, this.file.name)
        this.uploadTeamImage(fd).then((response) => {
          console.log(response);
          let body = {
              season: this.season,
              name: this.name,
              avatar: response.data,
              manager: this.user._id
          }
          if (response.status == 200) {
            body.avatar = response.data
          }
          this.addTeam(body).then((response) => {
            if(response.status === 200) {
              this.$emit("confirm")
            }
          })
        })
      }
      else {
        let body = {
            season: this.season,
            name: this.name,
            avatar: null,
            manager: this.user._id
        }
        this.addTeam(body).then((response) => {
          if(response.status === 200) {
            this.$emit("confirm")
          }
        })
      }
    },
    close(){
      this.$emit("close")
    },
    ...mapActions([
      'getUserTeams',
      'addTeam',
      'selectTeam',
      'uploadTeamImage'
    ])
  },
  computed:{
    ...mapGetters([
      'user'
    ])
  },
}
</script>
<style scoped>

</style>
