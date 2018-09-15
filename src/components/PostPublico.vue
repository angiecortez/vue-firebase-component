<template>
  <div class="col-8 ml-5">
    <br>
    <div id="divPostsArea" class="form-post hiden">
      <!-- <form @submit.prevent="addPost(newPosts, selectOption)">
        <div class="form-group">
          <label for="txtAreaPost">
            <b>Ideas para compartir</b>
          </label>
          <textarea v-model="newPosts" name="txtAreaPost" id="txtAreaPost" class="form-control form-textArea-rounded"
            placeholder="¿Que ideas tienes?"></textarea>
          <label for="sltPostType">Tipo de Post:</label>
          <select v-model="selectOption" id="sltPostType" class="form-control">
            <option>Público</option>
            <option>Privado</option>
          </select>
          <button type="submit" class="btn btn-primary form-btn">Publicar</button>
        </div>
      </form> -->

      <ul class="nav nav-tabs">
        <!-- <li class="nav-item" @click="listarPublicos" v-if='selectOption'>
          <a class="nav-link small text-uppercase active">Privado</a>

        </li> -->
        <li class="nav-item" @click="listarPrivados" v-if="!selectOption">
          <a class="nav-link small text-uppercase">Publico</a>
        </li>
      </ul>
        <!-- <li class="nav-item"><a data-toggle="tab" class="nav-link small text-uppercase active">Público</a>
          <article v-for="post in posts" v-bind:key="post['.key']">
            <div v-if="post.type == 'Público'">
              <h1>{{ post.postUser }}</h1>
            </div>
          </article>
        </li>
        <li class="nav-item"><a data-toggle="tab" class="nav-link small text-uppercase">Privado</a>
          <article v-for="post in posts" v-bind:key="post['.key']">
            <div v-if="post.type == 'Privado'">
              <h1>{{ post.postUser }}</h1>
            </div>
          </article>
        </li>
      </ul> -->
    </div>
    <div class="posts" @click="cambiarEstado" v-for="post in filterPost">
      <div>
        <div class="card mt-5">
          <div class="card-block">
            <section class="post-heading">
              <div class="row">
                <div class="col-md-12">
                  <div class="media">
                    <div class="media-left divPhoto">
                      <a>
                        <img style="width:70px; height:auto; border-radius:50px" :src="post.userProfile.foto" alt="fotoUsuario">
                      </a>
                    </div>
                    <div class="media-body">
                      <a class="anchor-username"><h4 class="media-heading">{{ post.postUser }}</h4></a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section class="post-body">
              <div class="post-message">
                <textarea style="display:none; width:355px; heigth:30px">></textarea>
              </div>
            </section>
            <section class="post-footer">
              <hr>
              <div class="post-footer-option container">
                <a href="#">
                  <i style="heigth:5px" class="fa fa-heart-o"></i>
                </a><b></b>
                <button class="btn btn-primary btn-sm">Editar</button>
                <button style="display:block" class="btn btn-primary btn-sm">Guardar</button>
                <button  class="btn btn-primary btn-sm">Eliminar</button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

</div>
</template>

<script>
import firebase from 'firebase'
import dataFirebase from '@/main'
import { postRef } from '@/main'
import HelloWorld from '@/components/HelloWorld'
import { db } from '@/main'

let userProfile = {}

export default {
  name:'PostPublico',
  data(){
    return{
      newPosts: null,
      name: "",
      photo: "",
      selectOption: false,
      posts : []
    }
  },
  firestore() {
    return {
      posts : db.collection("posts").orderBy('createdAt')
    }
  },
  created(){
    let vm = this;
    let userUid = firebase.auth().currentUser.uid;
    firebase.database().ref("Users/" + userUid).on("value", userRef => {
      let user = userRef.val()
      userProfile = user
      vm.user = user
      vm.name = vm.user.nombre
      vm.photo = vm.user.foto
      vm.uid = vm.user.uid
    })
  },
  computed: {
    filterPost() {
      let userUid = firebase.auth().currentUser.uid;

      return this.posts.filter(el => {
        if (this.selectOption && el.type === 'Privado' && el.userProfile.uid === userUid) return el
        if (!this.selectOption && el.type === 'Público') return el
      })
    }
  },
  methods: {
    cambiarEstado(){
      if (this.posts.type === Privado) {

      }
    },
     listarPrivados() {
       alert('privado')
     if(this.selectOption === true){
       this.filterPost
     }
        // let query = db.collection("posts")
                        // .where("type", "==", "Privado")
                        // .where("userProfile.uid","==",`${userProfile.uid}`)
                        // .orderBy("createdAt","desc")
         // query.onSnapshot(postSnapshot =>  filterPost(postSnapshot))
    },
     listarPublicos() {
       alert('publico')
       if (!this.selectOption) {
         this.filterPost
       }
        // let query = db.collection("posts")
        //                 .where("type", "==", "Público")
        //                 .orderBy("createdAt","desc")
        // query.onSnapshot((postSnapshot) => {
        //     filterPost(postSnapshot)
        // })
    },
    addPost(newPosts, selectOption){
      db.collection("posts").add({
          postUser: newPosts,
          userProfile: userProfile,
          like: 0,
          type: selectOption,
          createdAt: new Date(),
        })
        this.newPosts = ''
    }

    // postPrivado (){
    //   this.posts = this.posts.filter(post=>{
    //     return posts.type="Privado"
    //   })
    // },
    // postPublico: function() {
    //   this.posts = this.posts.filter(function(post1) {
    //     return post1.type === "Público"
    //   })
    // }
  }
}

</script>

<style>
.post {
  align-content: center;
  background-color: #bbf5a9;
}
.postUser {
  padding: 15px 0 0 0;
  color: #0ca119;
  background-color: #f5f835;
  margin-left: 300px;
  margin-right: 300px;
  margin-top: 12px;
  padding-top: 17px;
}
.texto {
  width: 80%;
  height: 50px;
}
</style>
