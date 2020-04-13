<template>
  <div class="home">
    <h1>NanoBlog</h1>
    <IpfsInfo/>
  </div>
</template>

<script>
// @ is an alias to /src
import IpfsInfo from '@/components/IpfsInfo.vue'

export default {
  name: 'Home',
  components: {
    IpfsInfo
  }
}
</script>
