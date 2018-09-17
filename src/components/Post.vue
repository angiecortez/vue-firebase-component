<template>
  <div class="col-8 ml-5">
    <br>
    <div id="divPostsArea" class="form-post hiden">
      <form @submit.prevent="addPost()">
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
      </form>
    </div>
</div>
</template>

<script>
import firebase from 'firebase'
import { db } from '@/main'

let userProfile = {}

export default {
  name: 'Post',
  data () {
    return {
      newPosts: null,
      name: '',
      photo: '',
      selectOption: null,
      posts: []
    }
  },
  created () {
    let vm = this
    let userUid = firebase.auth().currentUser.uid
    firebase.database().ref('Users/' + userUid).on('value', userRef => {
      let user = userRef.val()
      userProfile = user
      vm.user = user
      vm.name = vm.user.nombre
      vm.photo = vm.user.foto
      vm.uid = vm.user.uid
    })
  },
  methods: {
    cambiarEstado () {
      if (this.posts.type === 'Privado') {
      }
    },
    addPost () {
      db.collection('posts').add({
        postUser: this.newPosts,
        userProfile: userProfile,
        like: 0,
        type: this.selectOption,
        createdAt: new Date()
      })
      this.newPosts = ''
      this.selectOption = ''
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
