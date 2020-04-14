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
    {{status}}
    {{cid}}
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
      posts: [],
      status: "",
      cid: "",
      ipfs: null
    };
  },
  mounted: function() {
    this.getIpfsNodeInfo();
  },
  methods: {
    async getAccountHistory() {
      axios
        .get(
          "https://mynano.ninja/api/accounts/" +
            this.$route.params.account +
            "/history"
        )
        .then(response => (this.posts = response.data));
    },
    async getIpfsNodeInfo() {
      try {
        // Await for ipfs node instance.
        const ipfs = await this.$ipfs;
        const { id } = await ipfs.id();

        // Set successful status text.
        this.status = "Connected to IPFS via " + id;

        const chunks = [];
        for await (const chunk of ipfs.cat(
          "QmegQpayEXbET1SX5Ks1MKVMYDHih5h3LduMzPFxxqLvqw"
        )) {
          console.log("CHUNK", chunk);

          chunks.push(chunk);
        }
        console.log(Buffer.concat(chunks).toString());

        //this.addFile()
      } catch (err) {
        // Set error status text.
        this.status = `Error: ${err}`;
      }
    },
    async addFile() {
      const ipfs = await this.$ipfs;
      const filesAdded = await ipfs.add("Hello world!");
      console.log(filesAdded);

      filesAdded.forEach(file => console.log("successfully stored", file.hash));
    }
  }
};
</script>
