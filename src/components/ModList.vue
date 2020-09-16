<template>
  <div v-if="mods && mods.length">
    <b-card v-bind:title="mod.name" v-bind:sub-title="mod.short_description" v-bind:key="mod.id" v-for="mod of mods">
      <b-card-text>{{ mod.description }}</b-card-text>

      <b-link href="#" class="card-link">This is a link</b-link>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ModList',

  data () {
    return {
      mods: [],
      errors: []
    }
  },

  created () {
    axios.get('http://localhost:8000/api/browse')
      .then(response => {
        console.log(response)
        this.mods = response.data.result
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>

<style scoped>
div {
  width: 400px;
}
</style>
