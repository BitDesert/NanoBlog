<template>
  <div class="col-md-12">
    <div class="card mb-4 box-shadow">
      <div class="card-body">
        <p class="card-text">{{ msg }}</p>
      </div>
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