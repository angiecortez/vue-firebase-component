<template>
  <div class="signup">
  <form action="/action_page.php" id="formSingUp">
  <div class="imgcontainer">
    <img src="@/image/login.png" alt="Avatar" class="avatar">
  </div>
  <div class="container">
    <label for="uname"><b>Nombre</b></label>
    <input type="text" v-model="name" placeholder="Nombre" name="uname" >

    <label for="uname"><b>Email</b></label>
    <input type="email" v-model="email" placeholder="Email" name="uname">

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" v-model="password" >

    <button class='buttonSignUp' v-on:click="signUp" >Registrate</button>
    <label>
      <input type="checkbox" checked="checked" name="remember"> Remember me
    </label>
  </div>
  <div class="container" style="background-color:#f1f1f1">
    <p>No tienes cuenta? <router-link to="/login">Vamos !!</router-link></p>   
  </div>
</form>

  </div>
</template>
<script>
import firebase from 'firebase'
import dataFirebase from '@/main'

export default {
  name: 'signUp',
  data: () => {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signUp: function (e) {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(result => {
          let user = result.user
          const usuario = {
            uid: result.user.uid,
            displayName: this.name,
            email: user.email,
            photoURL: 'http://subirimagen.me/uploads/20180725011911.png'
          }
          dataFirebase.guardaDatos(usuario)
          dataFirebase.verificar()
          this.$router.replace('hello')
          console.log('exito')
        }).catch(error => console.log('Error huacala' + error.message))
        e.preventDefault();
        
    }
  }
}

</script>
<style>
.signup {
  background: url(http://subirimagen.me/uploads/20180919160048.png) no-repeat;
  background-size: cover;
}
#formSingUp {
  border: 3px solid #f1f1f1;
  width: 30%;
  margin: 0% 35%;
}
input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
.buttonSignUp {
  background-color: #4caf50;
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
@media screen and (max-width: 750px) {
  #formSingUp{
    width: 60%;
    margin: 0% 20%;
  }
}
@media screen and (max-width: 450px) {
  span.psw {
    display: block;
    float: none;
  }
  #formSingUp {
    width: 100%;
    margin: 0% 0%;
  }
}
</style>
