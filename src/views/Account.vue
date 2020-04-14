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
      history: [],
      posts: []
    };
  },
  mounted: async function() {
    await this.getAccountHistory();
  },
  methods: {
    async getAccountHistory() {
      axios
        .get(
          "https://api.nanocrawler.cc/v2/accounts/" +
            this.$route.params.account +
            "/history"
        )
        .then(response => {
          this.history = response.data;

          var changeblocks = this.history.filter(function(post) {
            return post.subtype == 'change';
          });

          changeblocks.forEach(block => {
            this.getIpfsData(block.representative);
            this.posts.push(block.representative);
          });
        });
    },
    async getIpfsData(ipfsPath) {
      try {
        // Await for ipfs node instance.
        const ipfs = await this.$ipfs;

        const chunks = [];
        for await (const chunk of ipfs.cat(ipfsPath)) {
          chunks.push(chunk);
        }

        return Buffer.concat(chunks).toString();
      } catch (err) {
        // Set error status text.
        //console.log(err.toString());
      }
    }
  }
};
</script>
