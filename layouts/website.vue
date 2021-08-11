<template>
  <main id="wrapper">
    <transition name="fade">
      <Loader v-if="processing"></Loader>
    </transition>
    
    <transition name="fade">
      <Loader v-if="processing"></Loader>
    </transition>
    
    <Navbar @logout="logout"/>
    <transition name="fade">
      <Nuxt/>
    </transition>
  </main>
</template>

<script>
    import Navbar from "~/components/Navbar";
    import Loader from "~/components/MainLoader";


    export default {
        components: {
            Navbar,
            Loader
        },
        data() {
            return {
                processing: false
            }
        },
        methods: {
            logout() {
                //return alert('log out from website');
                this.processing = true;

                const body = document.querySelector("body");
                const html = document.querySelector("html");

                body.classList.add('no-scroll');
                html.classList.add('no-scroll');

                localStorage.removeItem('event_id');

                setTimeout(() => {
                    body.classList.remove('no-scroll');
                    html.classList.remove('no-scroll');
                    this.processing = false;
                    this.$store.commit('UNSET_USER');
                    this.$router.push('/');
                }, 1000);
            }
        }
    };
</script>

<style lang="scss">
  @import "../assets/styles/SCSS/main";
</style>