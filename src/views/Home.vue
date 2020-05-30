<template>
  <div class="home">
    <h1>📓 NanoBlog</h1>
    <p>A blog system using the Nano cryptocurrency and IPFS</p>
    <h2>Create a new post</h2>
    <wysiwyg v-model="post" class="mb-3" />
    <button type="button" class="btn btn-primary" v-on:click="newPost">Post</button>
    <div v-if="newRep" class="mt-3">
      <h2>Successful!</h2>
      <p>Now change your representative to:</p>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Representative" id="newRep" v-model="newRep" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" v-on:click="copyRep">Copy</button>
        </div>
      </div>
      <qrcode-vue :value="newRep" :size="200"></qrcode-vue>
      <a :href="'nanorep:' + newRep" class="btn btn-secondary">Open App</a>
    </div>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import axios from "axios";

import bs58 from "bs58";
import * as nanocurrency from "nanocurrency";

export default {
  name: "Home",
  components: {
    QrcodeVue
  },
  data() {
    return {
      post: null,
      seed: null,
      newRep: null
    };
  },
  methods: {
    newPost: async function() {
      // Await for ipfs node instance.
      const ipfs = await this.$ipfs;

      console.log("Adding to IPFS...");

      var uploadObject = {
        body: this.post
      }

      const uploadString = JSON.stringify(uploadObject)

      const resultBuffer = [];
      for await (const result of ipfs.add(uploadString)) {
        resultBuffer.push(result);
      }
      var newPath = resultBuffer[0].path;

      console.log("Getting from IPFS...");

      const chunks = [];
      for await (const chunk of ipfs.cat(newPath)) {
        chunks.push(chunk);
      }

      var catresult = Buffer.concat(chunks).toString();
      console.log(catresult);

      if (catresult != uploadString) {
        console.log("Upload got an error!");
        return;
      } else {
        console.log("Upload is ok.");
      }

      // ensure it's on different providers
      const providers = [
        'https://ipfs.io/ipfs/',
        'https://ipfs.2read.net/ipfs/',
        'https://ipfs.globalupload.io/',
        'https://hardbin.com/ipfs/',
        'https://cloudflare-ipfs.com/ipfs/'
      ]

      providers.forEach(provider => {
        console.log('Provider:', provider);
        
        axios.get(provider + newPath)
      })

      console.log("Prepare address...");

      var ipfsPubKey = this.getBytes32FromIpfsHash(newPath);
      this.newRep = nanocurrency.deriveAddress(ipfsPubKey, {
        useNanoPrefix: true
      });

      console.log(this.newRep);
      
    },
    getBytes32FromIpfsHash(ipfsListing) {
      return bs58
        .decode(ipfsListing)
        .slice(2)
        .toString("hex");
    },
    copyRep() {
      let testingCodeToCopy = document.querySelector("#newRep");
      testingCodeToCopy.setAttribute("type", "text");
      testingCodeToCopy.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        console.log("Copy was", msg);
      } catch (err) {
        alert("Oops, unable to copy");
      }

      /* unselect the range */
      window.getSelection().removeAllRanges();
    }
  }
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
