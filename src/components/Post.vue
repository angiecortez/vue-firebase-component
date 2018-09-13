<template>
  <div class="col-8 ml-5">
            <br>
            <div id="divPostsArea" class="form-post hiden">
              <form @submit.prevent="addPost(newPosts, selectOption)">
                <div class="form-group">
                  <label for="txtAreaPost">
                    <b>Ideas para compartir</b>
                  </label>
                  <textarea v-model="newPosts" name="txtAreaPost" id="txtAreaPost"
                    class="form-control form-textArea-rounded"
                    placeholder="¿Que ideas tienes?"></textarea>

                  <label for="sltPostType">Tipo de Post:</label>
                  <select v-model="selectOption" id="sltPostType" class="form-control">
                    <option>Público</option>
                    <option>Privado</option>
                  </select>
                  <button type="submit" class="btn btn-primary form-btn">Publicar</button>
                </div>
              </form>

              <ul id="tabsJustified" class="nav nav-tabs">
                <li class="nav-item" ><a data-toggle="tab" class="nav-link small text-uppercase active">Público</a>
                  <article v-for="post in posts">
                    <div v-if="post.type == 'Público'">
                      <h1>{{ post.postUser }}</h1>
                    </div>
                  </article>
                </li>
                <li class="nav-item"><a data-toggle="tab" class="nav-link small text-uppercase">Privado</a>
                  <article v-for="post in posts">
                    <!-- <p v-if="post.postUser "></p> -->

                    <div v-if="post.type == 'Privado'">
                      <h1>{{ post.postUser }}</h1>
                    </div>
                  </article></li>
              </ul>
              <!-- <button type="button" v-if="Publico"></button>
              <button type="button"></button> -->
            </div>
            <div id="divPosts" class="show" >
        </div>
        <!-- <div>
          <article v-for="post in posts">

            <div v-if="post.type == 'Privado'">
              <h1>{{ post.postUser }}</h1>
            </div>
          </article>
        </div> -->
  </div>

  <!-- <div class="post">
  <div class="postUser">
    <div class="photo">
     <img :src="photo" style="width:35px; height:auto; border-radius:50px" alt="">
      <p>{{ name }}</p>
    </div>
    <div>
      <input class="texto" v-model="newPost" placeholder="Añadir comnetario">
    </div>
    <button v-on:click="submitName()">Publicar</button>

  </div> -->
    <!-- <div>
      <ul>
        <li v-for="personName of  postUser" v-bind:key="personName['.key']">
          <div v-if="!personName.edit">
              <p>{{personName.newPost}}</p>
            <button @click="removeName(personName['.key'])">
              Eliminar
            </button>
            <button @click="setEditName(personName['.key'])">
              Editar
            </button>
          </div >
          <div v-else>
            <input type="text" v-model="personName.newPost"/>
            <button @click="saveEdit(personName)">Save

            </button>
            <button @click="cancelEdit(personName['.key'])">Cancel

            </button>
          </div>
          <div>
            <label></label>
          </div>
        </li>
      </ul>
    </div> -->

<!-- </div> -->
  <!-- <h1>{{message}}</h1> -->
</template>

<script>
import firebase from 'firebase'
import dataFirebase from '@/main'
import { postRef } from '@/main'
import HelloWorld from '@/components/HelloWorld'
import { db } from '@/main'

let userProfile = {}

export default {
  name:'Post',
  data(){
    return{
      newPosts: null,
      name: "",
      photo: "",
      selectOption: null,
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
    })
  },
  methods: {
    //  listarPrivados() {
    //     let query = db.collection("posts")
    //                     .where("type", "==", "Privado")
    //                     .where("userProfile.uid","==",`${userProfile.uid}`)
    //                     .orderBy("createdAt","desc")
    //     query.onSnapshot((postSnapshot) => )
    // },
    //  listarPublicos() {
    //     let query = db.collection("posts")
    //                     .where("type", "==", "Público")
    //                     .orderBy("createdAt","desc")
    //     query.onSnapshot((postSnapshot) => {
    //         createPost(postSnapshot)
    //     })
    // },
    addPost(newPosts, selectOption){
      db.collection("posts").add({
          postUser: newPosts,
          userProfile: userProfile,
          like: 0,
          type: selectOption,
          createdAt: new Date(),
        })
        this.newPosts = ''
    },

    postPrivado (){
      this.posts = this.posts.filter(post=>{
        return posts.type="Privado"
      })


    }
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
