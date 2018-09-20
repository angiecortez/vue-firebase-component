<template>
  <div class="col-8 ml-5">
 <br>
<form class="formoid-solid-light-green" style="" method="post" @submit.prevent="addPost()" >
		<div class="title">
			<h2>Ideas para compartir</h2>
		</div>
		<div class="element-textarea"><label class="title"></label>
			<div class="item-cont"><textarea  v-model="newPosts" class="small" name="textarea" cols="20" rows="5" placeholder="Escribe Comentario"></textarea><span
				 class="icon-place"></span></div>
		</div>
        <select v-model="selectOption" name="select" class="selectOption" >
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
  max-width: 480px;
  min-width: 150px;
  font-size: 1em;
  line-height: 1.231;
  border-radius: 5px 5px 0 0;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
  margin: 0 auto;
  display: block;
  margin-top: 0em;
}

.title {
  background-color: #2ecc71;
  border-top: 1px solid #6cdb9b;
  border-bottom: 5px solid #18b159;
  border-radius: 5px 5px 0 0;
  margin: 0;
  padding-top: 1em;
  padding-bottom: 1em;
}
.formoid-solid-light-green div.title {
  margin: 0;
  padding-top: 1em;
  padding-bottom: 1em;
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
h2 {
  display: block;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
.element-textarea {
  font-family: inherit;
  color: inherit;
  position: relative;
  margin-left: 25px;
  margin-right: 25px;
  margin: 8px;
  display: block;
  resize: none;
}
.formoid-solid-light-green textarea.small {
  width: 100%;
  *width: 94%;
  height: 5.5em;
}
.formoid-solid-light-green .small {
  width: 25%;
  *width: 23%;
}
.formoid-solid-light-green textarea {
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
.btnPublicar{
  margin: 14px;
  background-color: rgba(59, 230, 125, 0.849);
  border: #2ecc71;
  border-radius: 4px;
  width: 60%;
  height: 80%;
  text-align: center;
  color: #035023
}
</style>
