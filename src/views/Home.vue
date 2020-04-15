<template>
  <div class="home">
    <h1>NanoBlog</h1>
    <IpfsInfo/>
    <wysiwyg v-model="post" />
    <div v-html="post"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import IpfsInfo from '@/components/IpfsInfo.vue'

export default {
  name: 'Home',
  components: {
    IpfsInfo
  },
  data() {
    return {
      post: null
    };
  },
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
