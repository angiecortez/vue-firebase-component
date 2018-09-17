<template>
  <div>
    <div class="menu__tab">
      <a v-bind:class="{ active: selectOption }"
         @click="selectOption = true"
         class="nav-link small text-uppercase active">Privado</a>

      <a v-bind:class="{ active: selectOption }"
         @click="selectOption = false"
         class="nav-link small text-uppercase">Publico</a>
    </div>
    <div v-if="selectOption">
      <posts title="Privados" :posts="postsPrivado"></posts>
    </div>
    <div v-else>
      <posts title="Públicos" :posts="postsPublico"></posts>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
import { db } from '@/main'
import posts_view from '@/view/Posts_view'

export default {
  name: 'Listado',

  data () {
    return {
      selectOption: true,
      posts: [],
      postsPrivado: [],
      postsPublico: [],
    }
  },

  firestore() {
    return {
      posts: db.collection('posts'),
      postsPrivado: db.collection('posts')
                      .where('type', '==', 'Privado')
                      .where('userProfile.uid', '==', firebase.auth().currentUser.uid),
      postsPublico: db.collection('posts').where('type', '==', 'Público')
    }
  },

  components: {
    posts: posts_view
  }
}
</script>

<style scoped>
.menu__tab {
  display: flex;
}
.menu__tab a {
  border: 1px solid grey;
  border-bottom: none;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  margin: 10px 2px;
}
.menu__tab a:hover {
  cursor: pointer;
  background-color: grey;
  color: white;
}
</style>
