<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#">NanoBlog</a>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/ipfs" class="nav-link">IPFS</router-link>
          </li>
          <li class="nav-item">
            <a href="https://github.com/BitDesert/NanoBlog" target="_blank" class="nav-link">GitHub</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0" @submit="search">
          <input class="form-control mr-sm-2" type="text" placeholder="nano_1abc34..." v-model="searchinput">
          <button class="btn btn-secondary my-2 my-sm-0" type="submit" v-on:click="search">Search</button>
        </form>
      </div>
    </nav>

    <main role="main" class="container">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchinput: null
    };
  },
  methods: {
    search(e) {
      e.preventDefault();
      this.$router.push({ name: 'Account', params: { account: this.searchinput } })
      this.searchinput = ''
    }
  }
};
</script>

<style>
body {
  padding-top: 5rem;
}

@import "~bootstrap/dist/css/bootstrap.css";
</style>
