<template>
  <div id="app">
    <div class="container">
      <ModList />
    </div>
  </div>
</template>

<script>
import ModList from './components/ModList.vue'

export default {
  name: 'App',
  components: {
    ModList
  }
}
</script>

<style>
#app {
  width: 960px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 100%;
}
</style>
