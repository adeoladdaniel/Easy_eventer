<template>
  <section>
    <div class="liner"></div>

    <!--This is the sub navigation-->
    <transition name="pullout">
      <section id="sub-nav" :class="{'pullout-down': pull, 'pullout-up': !pull}">
        <div class="wrapper">
          <!--<span class="sub-nav-item"> <nuxt-link to="/manage/create"> Create </nuxt-link></span>-->

          <span class="sub-nav-item"><nuxt-link :to="'/manage/event/' + id"> Event </nuxt-link></span>

          <span class="sub-nav-item"><nuxt-link :to="'/manage/event/' + id + '/attendee'"> Attendees </nuxt-link></span>

          <span class="sub-nav-item"><nuxt-link :to="'/manage/event/' + id + '/share'"> Share </nuxt-link></span>

          <span class="sub-nav-item"><nuxt-link :to=" '/manage/event/' + id + '/activities'"> Activities </nuxt-link></span>
        </div>
        <div class="pull" @click="pull = !pull">
          <img src="~/assets/icons/manage/arrow-up.svg">
        </div>
      </section>
    </transition>
    <!--End of sub navigation-->

  </section>
</template>

<script>
  export default {
    name: "Subnav",
    data() {
      return {
        pull: false,
      }
    },
    computed:{
        id: function (){
            return this.$route.params.id;
        }
    },
  }
</script>

<style lang="scss" scoped>
  @import "~/assets/styles/SCSS/_mixins.scss";

  .liner {
    width: 100%;
    height: 1px;
    background-color: rgba(112, 112, 112, 0.1);
    @include screen('desktop') {
      .liner {
        display: none;
      }
    }
  }
</style>
