<template>
  <div id="app">
    <Header />
    <b-container class="container">
      <sd-mod-list />
    </b-container>
  </div>
</template>

<script>
import ModList from './components/mods/ModList.vue'
import Header from './components/header/Header.vue'

export default {
  name: 'App',
  components: {
    'sd-mod-list': ModList,
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
