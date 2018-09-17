<template>
  <div class="signup">
    <!-- <p>Vamos a crear una nueva cuenta</p>
    <h3>SignUp</h3>
    <input type="email" v-model="name" placeholder="Nombre"/>
    <input type="email" v-model="email" placeholder="Email"/>
    <input type="password" v-model="password" placeholder="Password"/>
    <button v-on:click="signUp" >Registrate</button>
    <span>Ya tienes una cuenta <router-link to="/login">Vamos!!!</router-link></span> -->
    <div class="col-sm-8 main-section">
      <div class="modal-content">
        <div class="col-12 user-img">
          <i class="material-icons prefix">person</i>
        </div>
        <div class="col-12 form-input">
          <form>
            <div class="form-group">
              <i class="material-icons prefixo">person</i>
              <!-- <i class="material-icons prefix">email</i> -->
              <input class="form-control" type="email" v-model="name" placeholder="Email">
            </div>
            <div class="form-group">
              <i class="material-icons prefixo">email</i>
              <!-- <i class="material-icons prefix">email</i> -->
              <input class="form-control" type="email" v-model="email" placeholder="Email">
            </div>
            <div class="form-group">
              <i class="material-icons prefixo">lock</i>
              <input type="password" class="form-control" v-model="password" placeholder="Ingresa tu contraseña">
            </div>
            <button v-on:click="signUp" class="btn btn-success">Registrate</button><br>
          </form>
        </div>
        <span>Ya tienes una cuenta <router-link to="/login">Vamos!!!</router-link></span>

      </div>
    </div>
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
    signUp: function() {
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
        }).catch(error => alert('opps' + error.message))
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
