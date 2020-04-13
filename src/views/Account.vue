<template>
  <div class="account">
    <h1 class="h3">{{ $route.params.account }}</h1>
    <Post
      v-for="(post, index) in posts"
      v-bind:post="post"
      v-bind:msg="post.hash"
      v-bind:index="index"
      v-bind:key="index"
    />
    {{ posts }}
  </div>
</template>

<script>
// @ is an alias to /src
import Post from "@/components/Post.vue";
import axios from "axios";

export default {
  name: "Account",
  components: {
    Post
  },
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    axios
      .get(
        "https://mynano.ninja/api/accounts/" +
          this.$route.params.account +
          "/history"
      )
      .then(response => (this.posts = response.data));
  }
};
</script>
