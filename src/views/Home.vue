<template>
  <div class="home">
    <h1>NanoBlog</h1>
    <IpfsInfo />
    <h2>Create a new post</h2>
    <div class="form-group" v-if="false">
      <label for="nanoSeed">Nano Seed</label>
      <input
        type="text"
        class="form-control"
        id="nanoSeed"
        aria-describedby="nanoSeedHelp"
        placeholder="Leave empty if wanted"
        v-model="seed"
      />
      <small
        id="nanoSeedHelp"
        class="form-text text-muted"
      >We'll never share your seed with anyone else.</small>
    </div>
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
      <a :href="'newrep:' + newRep" class="btn btn-secondary">Open App</a>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import IpfsInfo from "@/components/IpfsInfo.vue";
import QrcodeVue from "qrcode.vue";

import bs58 from "bs58";
import * as nanocurrency from "nanocurrency";

export default {
  name: "Home",
  components: {
    IpfsInfo,
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

      const resultBuffer = [];
      for await (const result of ipfs.add(this.post)) {
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

      if (catresult != this.post) {
        console.log("Upload got an error!");
        return;
      } else {
        console.log("Upload is ok.");
      }

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
        alert("Testing code was copied " + msg);
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
