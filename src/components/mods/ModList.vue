<template>
  <div>
    <div v-if="mods && mods.length" class="sd-mod-list row">
      <sd-mod-box v-for="mod of mods" :key="mod.id" :mod="mod" />
      <sd-mod-box v-for="mod of mods" :key="mod.id" :mod="mod" />
      <sd-mod-box v-for="mod of mods" :key="mod.id" :mod="mod" />
      <sd-mod-box v-for="mod of mods" :key="mod.id" :mod="mod" />
      <sd-mod-box v-for="mod of mods" :key="mod.id" :mod="mod" />
    </div>
    <b-pagination-nav
      align="center"
      :link-gen="paginationLink"
      :number-of-pages="this.totalPages !== undefined ? this.totalPages : 1"
    />
  </div>
</template>

<script>
import axios from 'axios'
import ModBox from './ModBox.vue'

export default {
  name: 'ModList',
  components: {
    'sd-mod-box': ModBox
  },

  data () {
    return {
      mods: [],
      errors: [],
      currentPage: -1,
      totalPages: -1
    }
  },

  methods: {
    paginationLink (pageNum) {
      return {
        path: `/browse/${pageNum}`
      }
    }
  },

  created () {
    axios.get(`http://localhost:8000/api/browse?page=${this.$route.params.page}`)
      .then(response => {
        console.log(response)
        this.mods = response.data.result
        this.currentPage = response.data.page
        this.totalPages = response.data.pages * 30
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>

<style scoped>

div.item {
  margin: 8px 0 8px 0;
}
</style>
