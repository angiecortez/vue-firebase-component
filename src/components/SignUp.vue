<template>
  <div class="signup">
    <p>Vamos a crear una nueva cuenta</p>
    <h3>SignUp</h3>
    <input type="email" v-model="name" placeholder="Email"/>
    <input type="email" v-model="email" placeholder="Email"/>
    <input type="password" v-model="password" placeholder="Password"/>
    <button v-on:click="signUp">Registrate</button>
    <span>Ya tienes una cuenta <router-link to="/login">Vamos!!!</router-link></span>

  </div>
</template>
<script>
import firebase from 'firebase'
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
    signUp: function() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(user => alert('Tu cuenta ha sido creada'))
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
    width: 10%;
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
