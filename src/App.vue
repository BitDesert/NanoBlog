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
            <router-link to="/account/nano_1neyq7mr77j5fmnj7h5zw59ypgpohhqu4ifjo5mkkjtpa5z3prng3kwy3tqo" class="nav-link">Demo Account</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <main role="main" class="container">
      <router-view />
    </main>
  </div>
</template>

<style>
body {
  padding-top: 5rem;
}

@import "~bootstrap/dist/css/bootstrap.css";
</style>
