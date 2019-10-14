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
              <v-img height="100px" :src="team ? constants.ADDRESS+image : image" v-else @click="launchFilePicker" contain>
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
      <v-card-actions>
      <v-btn color="primary" @click.native="(team) ? editCompetitionTeam() : createTeam()">Continue</v-btn>
      <v-btn text @click.native="close">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import constants from '../../assets/constants/constants'
export default {
  props:{
    show: Boolean,
    team: Object,
    myTeam: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      constants:constants,
      image: (this.team) ? this.team.avatar : null,
      file: null,
      temporada: [
        "14/15",
        "15/16",
        "16/17",
        "17/18",
        "18/19",
        "19/20"
      ],
      name: (this.team) ? this.team.name : '',
      season: (this.team) ? this.team.season : ''
    }
  },
  methods: {
    launchFilePicker(){
      this.$refs.file.click();
    },
    onFileChanged (event) {
      this.image = URL.createObjectURL(event.target.files[0])
      this.file = event.target.files[0]
    },
    createTeam() {
      if (this.myTeam) {
        if(this.file!=null){
          const fd = new FormData()
          fd.append('image', this.file, this.file.name)
          this.uploadTeamImage(fd).then((response) => {
            console.log(response);
            let body = {
                season: this.season,
                name: this.name,
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
      }
      else {
        if(this.file!=null){
          const fd = new FormData()
          fd.append('image', this.file, this.file.name)
          this.uploadTeamImage(fd).then((response) => {
            console.log(response);
            let body = {
              team: {
                season: this.season,
                name: this.name,
                avatar: null
              },
              competition: this.competition._id
            }
            if (response.status == 200) {
              body.team.avatar = response.data
            }
            this.addNoManagerTeam(body).then((response) => {
              if(response.status === 200) {
                this.$emit("confirm")
              }
            })
          })
        }
        else {
          let body = {
            team: {
              season: this.season,
              name: this.name,
              avatar: null
            },
            competition: this.competition._id
          }
          this.addNoManagerTeam(body).then((response) => {
            if(response.status === 200) {
              this.$emit("confirm")
            }
          })
        }
      }
    },
    editCompetitionTeam() {
      if(this.file!=null){
        const fd = new FormData()
        fd.append('image', this.file, this.file.name)
        this.uploadTeamImage(fd).then((response) => {
          let body = {
            team: {
              season: this.season,
              name: this.name,
              avatar: this.image
            },
            competition: this.competition._id
          }
          if (response.status == 200) {
            body.team.avatar = response.data
          }
          let data = {
            body: body,
            id: this.team._id
          }
          this.updateTeam(data).then((response) => {
            if(response.status === 200) {
              this.$emit("confirm")
            }
          })
        })
      }
      else {
        let body = {
          team: {
            season: this.season,
            name: this.name,
            avatar: this.image
          },
          competition: this.competition._id
        }
        let data = {
          body: body,
          id: this.team._id
        }
        this.updateTeam(data).then((response) => {
          console.log(response);
          if(response.status === 200) {
            this.$emit("confirm")
          }
        }).catch((err)=>{
          console.log(err)
        })
      }
    },
    close(){
      this.$emit("close")
    },
    ...mapActions("team",[
      'getUserTeams',
      'addTeam',
      'addNoManagerTeam',
      'uploadTeamImage',
      'updateTeam',
    ])
  },
  computed:{
    ...mapGetters({
      competition: 'competition/competition',
      user: 'user/user'
    })
  }

}
</script>
<style scoped>

</style>
