<template>
  <div id="app">
    <Header />
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import Header from './components/header/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>

body {
  margin: 0 auto;
  float: none;
}

#app {
}

.container {
  max-width: 960px;
}
</style>
