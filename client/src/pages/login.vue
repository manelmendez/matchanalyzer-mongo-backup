<template>
  <v-content class="welcome-content">
    <v-container grid-list-xl text-xs-center>
      <v-row class="login" v-if="login" wrap justify="center">
        <v-col cols=6>
          <v-card class="elevation-0">
            <v-toolbar dark color="primary" class="elevation-0">
              <v-toolbar-title>Iniciar sesión</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-text-field 
                  prepend-icon="person" 
                  ref="email" 
                  label="Email" 
                  placeholder="Email"
                  type="text" 
                  v-model="email" 
                  :rules="emailRules" 
                  required></v-text-field>
                <v-text-field 
                  autocomplete="new-password"
                  prepend-icon="lock" 
                  ref="password" 
                  label="Contraseña"
                  hint="At least 8 characters"
                  v-model="password"
                  min="8"
                  :append-icon="e1 ? 'visibility' : 'visibility_off'"
                  @click:append="() => (e1 = !e1)"
                  :type="e1 ? 'password' : 'text'"
                  counter
                  :rules="passwordRules"
                  required>
                </v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <a style="padding-right:10px" @click="login=!login">Si aún no tienes cuenta</a>
              <v-btn depressed color="primary" rounded @click="submit" :disabled="!valid">Iniciar sesión</v-btn>
            </v-card-actions>
          </v-card>
          <g-signin-button class="googleButton"
            :params="googleSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError">
            <i class="fab fa-google-plus-square"></i>
            Inicia sesión con Google
          </g-signin-button>
          <fb-signin-button class="fb-signin-button"
            :params="fbSignInParams"
            @success="onSignInSuccessFB"
            @error="onSignInErrorFB">
            Sign in with Facebook
          </fb-signin-button>
        </v-col>
      </v-row>
      <v-row v-else class="register" wrap justify="center">
          <v-col cols=6>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Registrarse</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid2" ref="form2" lazy-validation>
                  <v-text-field prepend-icon="person" name="name" label="Nombre" type="text" v-model="name" required></v-text-field>
                  <v-text-field prepend-icon="person" name="email" label="Email" type="text" v-model="email2" :rules="emailRules" required></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Contraseña" type="password"
                    autocomplete="new-password"
                    hint="At least 8 characters"
                    v-model="password2"
                    min="8"
                    :append-icon="e2 ? 'visibility' : 'visibility_off'"
                    @click:append="() => (e2 = !e2)"
                    counter
                    :rules="passwordRules"
                    required>
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <a style="padding-right:10px" @click="login=!login">Volver a Inicio de Sesión</a>
                <v-btn color="primary" @click="submit2" :disabled="!valid2">Registrarse</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        login: true,
        //LOGIN
        e1: true,
        valid: true,
        email: '',
        password:'',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => !(v.length < 8) || 'At least 8 characters',
          v => !(v.length > 25) || 'Maximum 25 characters'
        ],
        googleSignInParams: {
            client_id: '789878609986-e6mror8thj7d7t73gmnufsprjagpp4er.apps.googleusercontent.com'
        },
        fbSignInParams: {
          scope: 'email,user_likes',
          return_scopes: true
        },
        // REGISTRO
        e2: true,
        valid2: true,
        email2: '',
        password2:'',
        name: ''
      }
    },
    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          let body = {
            email: this.email,
            password: this.password
          }
          this.signIn(body).then((response) => {
            console.log(response)
            if(response.status === 200) {
              let snackbar={show:true, color:"success", text:"Logueado correctamente"}
              this.$store.commit('root/SNACKBAR', snackbar)
              this.$router.push({
                name: "index" //si uso path: "/mainpage" el params (props) no funciona -- params: { user: response.data.user } --
              })
            }
          })
          .catch((err) => {
            console.log(err);
          })
        }
      },
      onSignInSuccess (googleUser) {
        this.signInGoogle(googleUser)
        .then(response => {
          if(response.status === 200) {
            setTimeout(() => {
              this.$router.push({
                name: "index" //si uso path: "/mainpage" el params (props) no funciona -- params: { user: response.data.user } --
              })
            }, 2000);
          }
        })
      },
      onSignInError (error) {
        // `error` contains any error occurred.
        console.log('OH NOES', error)
      },
      onSignInSuccessFB (response) {
        console.log(response);
        FB.api('https://graph.facebook.com/me', dude => {
          console.log(dude);
          console.log(`Good to see you, ${dude.name}.`)
        })
      },
      onSignInErrorFB (error) {
        console.log('Error en el login de Facebook', error)
      },
      submit2() {
        if (this.$refs.form2.validate()) {
          let body = {
            email: this.email2,
            password: this.password2,
            name: this.name
          }
          this.signUp(body).then((response) => {
            if(response.status === 200) {
              setTimeout(() => {
                this.$router.push({
                  name: "index" //si uso path: "/mainpage" el params (props) no funciona -- params: { user: response.data.user } --
                })
              }, 2000);
            }
          })
        }
      },
      ...mapActions("user",[
        'signIn',
        'signUp',
        'signInGoogle'
      ])
    },
    events: {}
  }
</script>

<style>
.welcome-content {
  width: 100%;
  min-height:100%;
  height: 100%;
  position: fixed;
  align-items: center;
  align-content: center;
  justify-content: center;
}
.googleButton {
  background-color: #dd4c3a;
  color: #ffffff;
  cursor: pointer;
  padding: 5px;
  border-radius: 3px;
  font-size: 16px;
  margin-top: 10px;
}
.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
  padding: 5px;
  font-size: 16px;
  margin-top: 10px;
}
</style>
