<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>Account: {{ $route.params.account }}</div>
    <Post msg="This is the post message"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Post from '@/components/Post.vue'

export default {
  name: 'Account',
  components: {
    Post
  }
}
</script>
