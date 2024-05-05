<template>
  <!-- <nav>
    <router-link to="/login">login</router-link> |
    <router-link to="/register">register</router-link> |
    <router-link to="/article-list">list</router-link> |
    <router-link to="/article-new">new</router-link> |
    <router-link to="/article-update">update</router-link>
  </nav> -->
  <router-view />
</template>

<style>
#app {
  width: 100%;
  height: 100%;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
