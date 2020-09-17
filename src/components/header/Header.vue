<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">OpenDock</b-navbar-brand>

    <b-navbar-nav class="ml-auto">
      <b-nav-form>
        <b-form-input size="sm" class="mr-sm-2" placeholder="Search" />
        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
      </b-nav-form>

      <b-nav-item href="#">Sign Up</b-nav-item>

    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'SdHeader'
}
</script>

<style scoped>
</style>
