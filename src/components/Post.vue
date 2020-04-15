<template>
  <div class="card mb-4 box-shadow">
    <div class="card-body">
      <p class="card-text" v-html="post.msg"></p>
      <p class="card-text"><small class="text-muted">{{ post.timestamp | moment("from") }}</small></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  }
}
</script>