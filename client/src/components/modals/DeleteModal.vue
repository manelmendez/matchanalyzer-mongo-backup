<template>
  <v-dialog v-if="show" v-model="show" max-width="290" persistent>
    <v-card>
      <v-card-title class="headline" v-model="title">{{title}}</v-card-title>
      <v-card-text>{{text}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat="flat" @click="close()">Atras</v-btn>
        <v-btn color="green darken-1" flat="flat" @click="confirm()">Adelante</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
    name: "DeleteModal",
    props: {
        type: String,
        show: Boolean
    },
    data() {
        return {
            match: {
                title: "Quieres borrar este partido?",
                text: "Si aceptas, el partido se borrará y se perderán todos sus datos. Quieres continuar?"
            },
            jornada: {
                title: "Quieres borrar esta jornada?",
                text: "Si aceptas, la jornada se borrará y se perderán todos sus partidos y datos estadísticos. Quieres continuar?",
            },
        }
    },
    computed:{
        title(){
            if(this.type=="jornada"){
                return this.jornada.title
            }
            else if(this.type=="match"){
                return this.match.title
            }
        },
        text(){
            if(this.type=="jornada"){
                return this.jornada.text
            }
            else if(this.type=="match"){
                return this.match.text
            }
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        confirm(){
            this.$emit('delete');
        }
    }
}
</script>
<style scoped>

</style>

