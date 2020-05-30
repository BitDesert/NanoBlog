<template>
  <div class="home">
    <h1>IPFS Debug</h1>
    <IpfsInfo />
  </div>
</template>

<script>
// @ is an alias to /src
import IpfsInfo from "@/components/IpfsInfo.vue";

export default {
  name: "Ipfs",
  components: {
    IpfsInfo
  }
};
</script>

<style>
</style>
