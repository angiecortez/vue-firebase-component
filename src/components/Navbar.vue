<template>
  <div>
    <!-- <h1>{{ msg }}</h1> -->
    <header>
      <div class="contenido">
        <nav class="navbar navbar-light" style="background-color: #A5DF00;">
        <div id="content" class="navbar-brand1"></div>
        <div class="media">
          <div class="media-left divPhoto">
            <!-- </a><img src="../src/image/icon.png" class="media-object photo-profile"  style="width:75px; height:auto; border-radius:50px" alt=""> -->
            <a class="navbar-brand">Ambientalist Lover</a>
          </div>
        </div>

          <div class="form-inline">
            <div class="show" id="buttons">
              <button class="btn btn-info my-2 my-sm-0 ml-2" data-toggle="modal" data-target="#exampleModal">Registrate</button>
              <button class="btn btn-info my-2 my-sm-0 ml-2" data-toggle="modal" data-target="#exampleModal1">Logueate</button>
            </div>
            <button id="close" class="btn btn-info my-2 my-sm-0 ml-2 hiden">Cerrar sesión</button>
          </div>
        </nav>
      </div>
    </header>
    <button v-on:click="logout">Logout</button>

  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Navbar',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    logout: function(){
      firebase.auth().signOut().then(()=> this.$router.replace('login'))
    }
  }
}
</script>
