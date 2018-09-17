<template>
  <div class="modal-dialog text-center">
    <div class="col-sm-8 main-section">
      <div class="modal-content">
        <div class="col-12 user-img">
          <i class="material-icons prefix">person</i>
        </div>
        <div class="col-12 form-input">
          <form>
            <div class="form-group">
              <i class="material-icons prefixo">email</i>
              <input class="form-control" type="email" v-model="email" placeholder="Email">
            </div>
            <div class="form-group">
              <i class="material-icons prefixo">lock</i>
              <input type="password" class="form-control" v-model="password" placeholder="Ingresa tu contraseña">
            </div>
            <button v-on:click="login" class="btn btn-success">Connection</button><br>
            <button v-on:click="facebook" class="btn btn-success mt-5">Facebook</button>
            <button v-on:click="gmail" class="btn Danger mt-5 ml-2">Gmail</button>
          </form>
        </div>
        <div class="col-12 link-part">
        </div>
        <p>No tienes cuenta? <router-link to="/signup">Crea una aqui tu cuenta</router-link></p>
      </div>
    </div>

  </div>
</template>
<script>

import firebase from 'firebase'
import dataFirebase from '@/main'
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(user => alert('Bien hecho, ahora estas conectado', this.$router.replace('hello')))
        .catch(error => alert(error, 'error.message'))
    },
    facebook: function () {
      let provider = new firebase.auth.FacebookAuthProvider()
      provider.setCustomParameters({
        'display': 'popup'
      })
      firebase.auth().signInWithPopup(provider).then((result) => {
        const user = result.user
        dataFirebase.guardaDatos(user)
        this.$router.replace('hello')
      }).catch((error) => {
        alert('err' + error.message)
      })
    },
    gmail: function () {
      let provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then((result) => {
        let user = result.user
        dataFirebase.guardaDatos(user)
        this.$router.replace('hello')
      })
    }
  }
}
</script>
<style>
.margin-section{
  margin: 0 auto;
  margin-top: 150px;
  padding: 0;
}
.modal-content{
  background-color: #BEF2A0;
  opacity: .85;
}
.user-img{
  margin-top: -40px;
  margin-bottom: 30px;
}
.user-img a{
  height: 100px;
  width: 100px;
}
.form-group{
  margin-bottom: 20px;
}
.form-group input{
    border-radius: 0;
    border-top: 0;
    height: 38px;
    padding-left: 50px
}
.prefix{
  font-size: 100px
}
.prefixo{
  position: absolute;
  left: 25px;
  font-size: 25px;
  margin-top: 5px;
}

</style>
