<template>
  <div class="post__container">
    <h3 class="post__title">Posts {{ title }}</h3>
    <div class="post__content" v-for="post in posts" :key="post.id">
      <aside class="img__container">
        <img class="data__image" :src="post.userProfile.foto">
      </aside>
      <div class="user__data">
        <h5 class="data__username">{{ post.userProfile.nombre }}</h5>
        <p class="data__type">Tipo: {{ post.type }}</p>
        <p class="data__email">Email: {{ post.userProfile.email }}</p>
        <div class="data__post">
          <p @keyup.enter="guardar1(post)" :id="post.id">{{ post.postUser }}</p>
        </div>
        <button class="btn btn-success" @click="countLikes(post)">Me gusta {{ post.like }}</button>
        <!-- <section v-if="compareId(post)"> -->
          <button v-if="compareId(post)" @click="editar1(post)" type="button" :id="post.id+'btnEditar'" class="btn btn-primary">Editar</button>
          <button v-if="compareId(post)" @click="guardar1(post)" type="button" style="display:none" :id="post.id+'btnGuardar'" class="btn btn-primary">Guardar</button>
          <button v-if="compareId(post)" @click="eliminarPost(post)" class="btn btn-primary">Eliminar</button>
        <!-- </section> -->
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '@/main'
export default {
  name: 'post_view',
  props: ['title', 'posts'],
  methods: {
    countLikes (post) {
      let likes = post.like
      likes += 1
      firebase.firestore().collection('posts').doc(post.id).update({
        like: likes
      })
    },
    eliminarPost (post) {
      let r = confirm('Estas seguro de Eliminar la publicación')
      if (r) {
        db.collection('posts').doc(post.id).delete().then(() => {
        }).catch((error) => {
          console.error('Error removing document: ', error)
        })
      }
    },
    compareId (post) {
      return post.userProfile.uid === firebase.auth().currentUser.uid
    },
    editar1 (post) {
      document.getElementById(post.id + 'btnEditar').style.display = 'none'
      document.getElementById(post.id + 'btnGuardar').style.display = 'inline-block'
      document.getElementById(post.id).setAttribute('contenteditable', true)
    },
    guardar1 (post) {
      document.getElementById(post.id).setAttribute('contenteditable', false)
      document.getElementById(post.id + 'btnEditar').style.display = 'inline-block'
      document.getElementById(post.id + 'btnGuardar').style.display = 'none'
      let contenidoEditado = document.getElementById(post.id)
      let newContent = contenidoEditado.textContent
      const confirmado = confirm('Estas seguro de Editar la publicación')
      if (confirmado) {
        db.collection('posts').doc(post.id).update({
          postUser: newContent
        }).then(() => {
          console.log('Document successfully updated!')
        }).catch((error) => {
          console.error('Error updating document: ', error)
        })
      }
    }
  }
}
</script>
<style scoped>
.post__container {
  text-align: left;
  padding: 10px;
}
.post__content {
  border: 1px solid #fafafa;
  margin: 20px 0;
  padding: 10px;
  box-shadow: 3px 5px 10px #cacaca;
  border-radius: 5px;

  display: flex;
  flex-wrap: wrap;
}
.img__container {
  width: 200px;
  display: flex;
  align-items: center;
}
.data__image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
	margin-left: 20%;
}
.user__data {
  flex-grow: 1;
}
.user__data p {
  margin: 0;
  padding: 0;
  color: #cacaca;
}
.data__type, .data__email {
  font-size: 12px;
  color: #fafafa;
}
.data__post {
  margin: 10px 0;
  padding: 10px 0;
}
.data__post p {
  color: black;
}
.data__like {
  max-width: 100px;
  color: lightseagreen;
  padding: 5px 0;
}

</style>
