<template>
  <div>
    <div v-if="mods && mods.length" class="sd-mod-list row">
      <sd-mod-box v-for="mod of mods" :key="mod.id" :mod="mod" />
    </div>
    <b-pagination-nav
      align="center"
      :link-gen="generatePaginationLink"
      :number-of-pages="numPages"
    />
  </div>
</template>

<script>
import axios from 'axios'
import ModBox from '../../components/mods/ModBox'

export default {
  name: 'ScreenBrowse',
  components: {
    'sd-mod-box': ModBox
  },

  data () {
    return {
      mods: [],
      numPages: -1
    }
  },

  mounted () {
    if (!this.$route.params.page) {
      this.$router.push('/browse/1')
      return
    }

    this.fetchMods()
  },

  watch: {
    $route (to, from) {
      if (!to.params.page) {
        this.$router.push('/browse/1')
        return
      }

      this.fetchMods()
    }
  },

  methods: {
    generatePaginationLink (pageNum) {
      return {
        path: `/browse/${pageNum}`
      }
    },

    fetchMods () {
      axios.get(`http://localhost:8000/api/browse?page=${this.$route.params.page}`)
        .then(response => {
          this.mods = response.data.result
          this.numPages = response.data.numPages
        })
    }
  }
}
</script>
