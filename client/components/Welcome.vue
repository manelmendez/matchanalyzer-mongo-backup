<template>
  <v-content class="welcome-content">
    <v-container grid-list-xl text-xs-center>
      <v-layout row wrap justify-center>
        <v-flex xs6>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Iniciar sesión</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-text-field prepend-icon="person" name="email" label="Email" type="text" v-model="email" :rules="emailRules" required></v-text-field>
                <v-text-field prepend-icon="lock" name="password" label="Contraseña" type="password"
                  hint="At least 8 characters"
                  v-model="password"
                  min="8"
                  :append-icon="e1 ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (e1 = !e1)"
                  :type="e1 ? 'password' : 'text'"
                  counter
                  :rules="passwordRules"
                  required>
                </v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="submit" :disabled="!valid">Iniciar sesión</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-center>
        <v-flex xs6 justify-center>
          <g-signin-button class="googleButton"
            :params="googleSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError">
            <i class="fab fa-google-plus-square"></i>
            Inicia sesión con Google
          </g-signin-button>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-center>
        <v-flex xs6 justify-center>
          <fb-signin-button class="fb-signin-button"
            :params="fbSignInParams"
            @success="onSignInSuccessFB"
            @error="onSignInErrorFB">
            Sign in with Facebook
          </fb-signin-button>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { mapActions } from 'vuex'

  export default {
    name: 'Welcome',
    data () {
      return {
        e1: false,
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
        }
      }
    },
    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          alert("NICE")
        }
      },
      onSignInSuccess (googleUser) {

        this.signInGoogle(googleUser)
        .then(response => {
          if(response.status === 200) {
            setTimeout(() => {
              this.$router.push({
                name: "Teams" //si uso path: "/mainpage" el params (props) no funciona -- params: { user: response.data.user } --
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
      ...mapActions([
        'signIn',
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
}
.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
  padding: 5px;
  font-size: 16px;
}
</style>
