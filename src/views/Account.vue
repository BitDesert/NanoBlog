<template>
  <div class="account">
    <h1 class="h3">{{ $route.params.account }}</h1>
    <p class="text-center" v-if="posts.length == 0">{{status}}</p>
    <Post
      v-for="(post, index) in postsSorted"
      v-bind:post="post"
      v-bind:index="index"
      v-bind:key="index"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import Post from "@/components/Post.vue";
import axios from "axios";
import isIPFS from "is-ipfs";
import bs58 from "bs58";
import * as nanocurrency from "nanocurrency";
import each from "async/each";

export default {
  name: "Account",
  components: {
    Post
  },
  data() {
    return {
      posts: [],
      status: "Loading..."
    };
  },
  computed: {
    postsSorted() {
      return this.posts.slice(0).sort((a,b) => {
        return a.timestamp < b.timestamp;
      })
    }
  },
  watch: {
    '$route.params.account': async function () {
      await this.getAccountHistory();
    }
  },
  mounted: async function() {
    await this.getAccountHistory();
  },
  methods: {
    async getAccountHistory() {
      this.posts = []
      axios
        .get(
          "https://api.nanocrawler.cc/v2/accounts/" +
            this.$route.params.account +
            "/history"
        )
        .then(response => {
          var changeblocks = response.data.filter(function(block) {
            return block.subtype == "change";
          });

          each(changeblocks, this.prepareIpfs, function(err) {
            console.log("DONE", err);
            if (this.posts.length == 0) {
              this.status = "No posts found!";
            }
          });
        });
    },
    async prepareIpfs(block, callback) {
      var reppubkey = nanocurrency.derivePublicKey(block.representative);
      var ipfshash = this.getIpfsHashFromBytes32(reppubkey);

      if (!isIPFS.cid(ipfshash)) return;

      var ipfsdata = await this.getIpfsData(ipfshash);

      if (ipfsdata !== false) {
        console.log(block.hash, ipfshash, ipfsdata);

        try {
          var data = JSON.parse(ipfsdata)
        } catch (error) {
          console.log(block.hash, ipfshash, 'Parse error');       
          return    
        }

        this.posts.push({
          msg: data.body,
          timestamp: parseInt(block.timestamp)
        });
      }
      callback();
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
        return false;
      }
    },
    getIpfsHashFromBytes32(bytes32Hex) {
      const hashHex = "1220" + bytes32Hex;
      const hashBytes = Buffer.from(hashHex, "hex");
      const hashStr = bs58.encode(hashBytes);
      return hashStr;
    }
  }
};
</script>
