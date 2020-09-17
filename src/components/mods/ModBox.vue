<template>
  <div class="item col-md-4">
    <b-card
      v-bind:title="this.mod.title"
      v-bind:sub-title="this.mod.short_description"
      img-src="https://picsum.photos/600/300/?image=25"
      img-top
    >
      <b-card-text>{{ this.mod.description }}</b-card-text>

      <b-link href="#" class="card-link">This is a link</b-link>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'ModBox',
  props: {
    mod: {}
  }
}
</script>
