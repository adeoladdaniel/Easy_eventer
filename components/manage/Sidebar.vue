<template>
  <!--This is the mobile sub navigation-->
  <section id="sidebar" class="shown">
    <nuxt-link to="/manage/create" class="sidebar-item"> Create Event </nuxt-link>
    <nuxt-link to="/manage" class="sidebar-item"> My events </nuxt-link>
    <nuxt-link to="/manage/settings" class="sidebar-item"> Settings </nuxt-link>
    <nuxt-link to="/" class="sidebar-item"> Logout </nuxt-link>
  </section>
</template>

<script>
  export default {
    name: "Subnav",
    data() {
      return {
        pull: false
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
