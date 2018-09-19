<template>
  <div>
<!--     <div class="col-sm-8 main-section">
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
    </div> -->
<form action="/action_page.php">
  <div class="imgcontainer">
    <img src="@/image/login.png" alt="Avatar" class="avatar">
  </div>

  <div class="container">
    <label for="uname"><b>Email</b></label>
    <input type="email" v-model="email" placeholder="Email" name="uname" required>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" v-model="password" required>

    <button type="submit" v-on:click="login" >Login</button>
    <label>
      <input type="checkbox" checked="checked" name="remember"> Remember me
    </label>
  </div>

  <div class="container" style="background-color:#f1f1f1">
    <button type="button" class="cancelbtn" v-on:click="facebook">Facebook</button>
    <button type="button" class="cancelbtn" v-on:click="gmail" >Gmail</button>
    <p>No tienes cuenta? <router-link to="/signup">Crea una aqui tu cuenta</router-link></p>
    <span class="psw">No tienes cuenta ? <router-link to="/signup">Crea una cuenta aqui</router-link></span>
  </div>
</form>
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
/* .margin-section{
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
} */
form {border: 3px solid #f1f1f1;}
input[type=email], input[type=password] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
}
button {
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
}
button:hover {
    opacity: 0.8;
}
.cancelbtn {
    width: auto;
    padding: 10px 18px;
    background-color: #f44336;
}
.imgcontainer {
    text-align: center;
    margin: 24px 0 12px 0;
}
img.avatar {
    width: 40%;
    border-radius: 50%;
}
.container {
    padding: 16px;
}
span.psw {
    float: right;
    padding-top: 16px;
}
/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
    span.psw {
       display: block;
       float: none;
    }
    .cancelbtn {
       width: 100%;
    }
}
</style>