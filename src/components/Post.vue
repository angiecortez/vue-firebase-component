<template>
  <div class="col-8 ml-5">
 <br>
<form class="formoid-solid-light-green" @submit.prevent="addPost()" >
		<div class="title">
			<h2>Ideas para compartir</h2>
		</div>
		<div class="element-textarea"><label class="title"></label>
			<div class="item-cont"><textarea  v-model="newPosts" class="small" name="textarea" cols="20" rows="5" placeholder="Escribe Comentario"></textarea><span
				 class="icon-place"></span></div>
		</div>
        <select v-model="selectOption" name="select" class="selectOption">
					<option value="Público">Público</option>
					<option value="Privado">Privado</option>
				</select>
		<div class="submit">
       <button type="submit" class="btnPublicar">Publicar</button>
    </div>
	</form>
</div>
</template>

<script>
import firebase from "firebase";
import { db } from "@/main";

let userProfile = {};

export default {
  name: "Post",
  data() {
    return {
      newPosts: null,
      name: "",
      photo: "",
      selectOption: null,
      posts: []
    };
  },
  created() {
    let vm = this;
    let userUid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("Users/" + userUid)
      .on("value", userRef => {
        let user = userRef.val();
        userProfile = user;
        vm.user = user;
        vm.name = vm.user.nombre;
        vm.photo = vm.user.foto;
        vm.uid = vm.user.uid;
      });
  },
  methods: {
    cambiarEstado() {
      if (this.posts.type === "Privado") {
      }
    },
    addPost() {
      db.collection("posts").add({
        postUser: this.newPosts,
        userProfile: userProfile,
        like: 0,
        type: this.selectOption,
        createdAt: new Date()
      });
      this.newPosts = "";
      this.selectOption = "";
    }
  }
};
</script>

<style>
.formoid-solid-light-green {
  background-color: #ffffff;
  font-size: 14px;
  font-family: "Roboto", Arial, Helvetica, sans-serif;
  color: #34495e;
  border-radius: 5px 5px 0 0;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
  margin-left: 200px;
  display: block;
	width: 100%;
}
.title {
  background-color: #2ecc71;
  border-top: 1px solid #6cdb9b;
  border-bottom: 5px solid #18b159;
  border-radius: 5px 5px 0 0;
}
.formoid-solid-light-green div.title h2 {
  margin-left: 27px;
}
.formoid-solid-light-green h2 {
  margin: 0.2em 0;
  font-size: 2em;
  font-weight: 300;
  color: #fff;
}

.formoid-solid-light-green textarea.small {
  width: 100%;
  height: 5.5em;
}
.formoid-solid-light-green .small {
  width: 25%;
  width: 23%;
}
.formoid-solid-light-green textarea {
	border-radius: 5px 5px 0 0;
  border-style: solid;
  border-width: 2px;
  border-color: #bdc3c7;
  -webkit-transition: border-color 0.5s ease-in-out;
  transition: border-color 0.5s ease-in-out;
  border-radius: 3px;
  padding: 10px 10px 9px 2.3em;
  outline: none;
  -o-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  font-size: 1em;
}
.selectOption {

  width: 60%;
  height: 30px;
  /* padding: 12px 12px 12px 30px; */
  margin: 14px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: block;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.btnPublicar {
	background-color: rgba(59, 230, 125, 0.849);
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
	border-radius: 4px;
	width: 90%;
	height: 100%;
	text-align: center;
}

.btnPublicar:hover {
    background-color: #4CAF50; /* Green */
    color: white;
}
</style>
