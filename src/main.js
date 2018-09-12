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
