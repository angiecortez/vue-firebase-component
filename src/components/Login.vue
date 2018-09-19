<template>
  <div class="login">
  <form action="/action_page.php" id="formLogin">
  <div class="imgcontainer">
    <img src="@/image/login.png" alt="Avatar" class="avatar">
  </div>

  <div class="container">
    <label for="uname"><b>Email</b></label>
    <input type="email" v-model="email" placeholder="Email" name="uname" required>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" v-model="password" required>

    <button type="submit" class='buttonLogin' v-on:click="login" >Login</button>
    <label>
      <input type="checkbox" checked="checked" name="remember"> Remember me
    </label>
  </div>

  <div class="container" style="background-color:#f1f1f1">
    <button type="button" class="buttonLogin"  id='LoginFace' v-on:click="facebook">Facebook</button>
    <button type="button" class="buttonLogin" id='LoginGmail' v-on:click="gmail" >Gmail</button>
    <p>No tienes cuenta? <router-link to="/signup">Crea una aqui tu cuenta</router-link></p>
    <!-- <span class="psw">No tienes cuenta ? <router-link to="/signup">Crea una cuenta aqui</router-link></span> -->
  </div>
</form>
  </div>
</template>
<script>
import firebase from "firebase";
import dataFirebase from "@/main";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user =>
          alert(
            "Bien hecho, ahora estas conectado",
            this.$router.replace("hello")
          )
        )
        .catch(error => alert(error, "error.message"));
    },
    facebook: function() {
      let provider = new firebase.auth.FacebookAuthProvider();
      provider.setCustomParameters({
        display: "popup"
      });
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          const user = result.user;
          dataFirebase.guardaDatos(user);
          this.$router.replace("hello");
        })
        .catch(error => {
          alert("err" + error.message);
        });
    },
    gmail: function() {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          let user = result.user;
          dataFirebase.guardaDatos(user);
          this.$router.replace("hello");
        });
    }
  }
};
</script>
<style>
.login {
  background: url(http://subirimagen.me/uploads/20180919160048.png) no-repeat;
  background-size: cover;
}
#formLogin {
  border: 3px solid #f1f1f1;
  width: 30%;
  margin: 0% 35%;
}
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
.buttonLogin {
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
#LoginFace {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}
#LoginGmail {
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
@media screen and (max-width: 750px) {
  form {
    width: 60%;
    margin: 0% 20%;
  }
}
@media screen and (max-width: 450px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }
  form {
    width: 100%;
    margin: 0% 0%;
  }
}
</style>
