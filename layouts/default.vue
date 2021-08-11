<template>
  <main id="wrapper">
    <transition name="fade">
      <Loader v-if="show"></Loader>
    </transition>
    
    <Navbar @logout="process('logout')"
            @tickets="process('tickets')"
            @events="process('events')"
    />
    
    <transition name="fade">
      <Nuxt/>
    </transition>
    
    <Footer v-if="page !== 'event-id'"/>
  </main>
</template>

<script>
    import Navbar from "~/components/Navbar";
    import Footer from "~/components/Foot";
    import Loader from "~/components/MainLoader";

    export default {
        components: {
            Navbar,
            Footer,
            Loader
        },
        data(){
            return{
                show: false
            }
        },
        computed: {
            page() {
                return this.$route.name
            }
        },
        methods:{
            process(type){
                this.show = true;

                const body = document.querySelector("body");
                const html = document.querySelector("html");

                body.classList.add('no-scroll');
                html.classList.add('no-scroll');


                switch (type) {
                    case 'logout':
                        setTimeout(()=>{
                            //emit logout to close navbar menu
                            this.$bus.$emit('logout');
                            body.classList.remove('no-scroll');
                            html.classList.remove('no-scroll');
                            this.show =false;
                            this.$store.commit('UNSET_USER');
                            this.$router.push('/');
                        },  1000);
                        break;
                        
                    case 'events':
                        setTimeout(()=>{
                            //adds delay and push to tickets (this is cos transition does not take effect on layout change
                            body.classList.remove('no-scroll');
                            html.classList.remove('no-scroll');
                            this.$router.push('/manage');
                            this.show =false;
                        },  1000);
                        break;

                    case 'tickets':
                        setTimeout(()=>{
                            //emit logout to close navbar menu
                            body.classList.remove('no-scroll');
                            html.classList.remove('no-scroll');
                            this.$router.push('/manage/tickets');
                            this.show =false;
                        },  1000);
                        break;
                }
            },
        },
    };
</script>

<style lang="scss">
  @import "../assets/styles/SCSS/main";
</style>