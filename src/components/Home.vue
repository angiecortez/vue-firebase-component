<template>
  <div>
    <header>
      <div class="contenido">
        <nav class="navbar navbar-light" style="background-color: #A5DF00;">
        <div id="content" class="navbar-brand1"></div>
        <div class="media">
          <div class="media-left divPhoto">
          <img class="navbar-brand1" src="http://subirimagen.me/uploads/20180920144159.887d715"  style="width:70px; height:auto; border-radius:50px" alt="">
            <a class="navbar-brand">Ambientalist Lover</a>
          </div>
        </div>
          <div class="form-inline">
            <img  :src="photo" style="width:60px; height:auto; border-radius:50px; margin-right: 20px;" alt="Foto">
            <p style="margin-right: 20px;">{{ name }}</p>
            <button id="close" v-on:click="logout" class="btn btn-info my-2 my-sm-0 ml-2 hiden">Cerrar sesión</button>
          </div>
        </nav>
      </div>
    </header>
    <Carrusel/>
    <Post/>
    <Listado class="margen"/>

  </div>
</template>

<script>
// import dataFirebase from '@/main'
import firebase from 'firebase'
import Post from '@/components/Post'
import Carrusel from '@/components/Carrusel'
import Listado from '@/components/Listado'
export default {
  name: 'Home',
  data () {
    return {
      name: '',
      photo: ''
    }
  },
  created () {
    let vm = this
    let userUid = firebase.auth().currentUser.uid
    firebase.database().ref('Users/' + userUid).on('value', (userRef) => {
      let user = userRef.val()
      vm.user = user
      vm.name = vm.user.nombre
      vm.photo = vm.user.foto
    })
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => this.$router.replace('login'))
    }
  },
  components: {
    Post,
    Carrusel,
    Listado
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.margen {
margin-left: 50px;
margin-top: 30px;
}
.navbar-brand1 {
margin-left: 180px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button{
  padding: 10px 20px;
  background: #42b983;
  color: white;
  font-weight: bold;
  border: none;
  border-radius:22px;
}
</style>
