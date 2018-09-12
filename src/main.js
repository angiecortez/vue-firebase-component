import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

let app;
let config = {
  apiKey: "AIzaSyCt3mRnncuAu3A0hi2yxxyGEFwX7hBioZ4",
  authDomain: "redsocialv2.firebaseapp.com",
  databaseURL: "https://redsocialv2.firebaseio.com",
  projectId: "redsocialv2",
  storageBucket: "redsocialv2.appspot.com",
  messagingSenderId: "318300408911"
}
firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(user => {
  if(!app){
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      render: h => h(App)
    })
  }
})

const guardaDatos = (user) => {
  let usuario = {
    uid: user.uid,
    nombre: user.displayName,
    email: user.email,
    foto: user.photoURL,
  }
  firebase.database().ref('Users/' + user.uid)
  .set(usuario)
};
const verificar = () => {
  let user = firebase.auth().currentUser;
  user.sendEmailVerification().then(() => {
    alert('enviando correo');
  }).catch((error) => {
    console.log(error);
  });
};
const validadorNombre = (name) => {
    if ((/^([A-Za-z0-9\s]{8,})+$/g.test(name))) {
        return true
    } else {
        return false
    };
};
const validadorEmail = (email) => {
    if (/^([a-zA-Z0-9._-]{3,})+@([a-zA-Z0-9.-]{5,})+\.([a-zA-Z]{2,})+$/.test(email)) {
        return true;
    } else {
        return false;
    };
};
const validadorPassword = (password) => {
    if (/^([A-Za-z0-9]{8,})+$/g.test(password)) {
        return true;
    } else {
        return false;
    };
};

 export default {guardaDatos, verificar, validadorNombre, validadorEmail, validadorPassword}
