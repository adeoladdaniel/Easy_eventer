<template>
  <div id="alert">
    <div class="wrapper">
      <img src="~/assets/icons/manage/alert.svg">
      <span><slot></slot></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "alert"
  }
</script>

<style lang="scss" scoped>

</style>
