<template>
  <div class="signup">
    <p>Vamos a crear una nueva cuenta</p>
    <h3>SignUp</h3>
    <input type="email" v-model="name" placeholder="Nombre"/>
    <input type="email" v-model="email" placeholder="Email"/>
    <input type="password" v-model="password" placeholder="Password"/>
    <button v-on:click="signUp" >Registrate</button>
    <span>Ya tienes una cuenta <router-link to="/login">Vamos!!!</router-link></span>

  </div>
</template>
<script>
import firebase from 'firebase'
import data from '@/main'

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
    guardaDatos: function(user) {
      let usuario = {
        uid: user.uid,
        nombre: this.name,
        email: user.email,
        foto: user.photoURL,
      }
      firebase.database().ref('Users/' + user.uid)
      .set(usuario)
    },
    signUp: function() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(result => {
        let user = result.user
        guardaDatos(user)
        // const user = {
        //   uid: result.user.uid,
        //   displayName: this.name,
        //   email: result.user.email,
        //   photoURL: 'http://subirimagen.me/uploads/20180725011911.png',
        // // }
        // data.guardaDatos(user)
        // data.verificar();
        this.$router.replace('hello')
      })
      .catch(error => alert('opps' + error.message))
    }
  }
}

</script>
<style>
  .signup{
    margin-top: 40px;
  }
  input{
    margin: 10px 0;
    width: 100%;
    padding: 15px;
  }
  button{
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
  }
  span{
    display: block;
    margin-top: 10px;
    font-size: 11px;
  }

</style>
