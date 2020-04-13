<template>
  <div class="card mb-4 box-shadow">
    <div class="card-body">
      <p class="card-text" v-html="msg"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: String
  }
}
</script>