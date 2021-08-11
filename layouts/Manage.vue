<template>
  <div style="background-color: #F6F7F7">
    <transition name="fade">
      <Loader v-if="processing"></Loader>
    </transition>
    
    <!--This is the Navigation component-->
    <Navbar @logout="process('logout')"
            @home="process('home')"
            @tickets="process('tickets')"
            @events="process('events')"
            @how="process('how')"
    />
    <!--end of navigation component-->
    
    <transition name="fade">
      <nuxt/>
    </transition>
    
    <Footer/>
  </div>
</template>

<script>
    import Navbar from '@/components/manage/Navbar';
    import Footer from '@/components/manage/Footer';
    import Loader from '~/components/MainLoader';


    export default {
        middleware: 'auth',
        components: {
            Navbar,
            Footer,
            Loader
        },
        data() {
            return {
                show: false,
                processing: false,
            }
        },
        methods: {
            toggleSidebar: function () {
                this.show = !this.show;
            },
            process(type) {
                //return alert('hey from default');
                this.processing = true;

                const body = document.querySelector("body");
                const html = document.querySelector("html");

                body.classList.add('no-scroll');
                html.classList.add('no-scroll');
                
                switch (type) {
                    case 'home':
                        setTimeout(() => {
                            body.classList.remove('no-scroll');
                            html.classList.remove('no-scroll');
                            this.$router.push('/');
                            this.processing = false;
                        }, 1000);
                        break;

                    case 'events':
                        //check if same route is clicked
                        if(this.$route.path === '/manage'){
                            this.$bus.$emit('close-submenu');
                        }
                        
                        setTimeout(() => {
                            //adds delay and push to tickets (this is cos transition does not take effect on layout change
                            body.classList.remove('no-scroll');
                            html.classList.remove('no-scroll');
                            this.$router.push('/manage');
                            this.processing = false;
                        }, 1000);
                        break;

                    case 'how':
                        setTimeout(() => {
                            //adds delay and push to tickets (this is cos transition does not take effect on layout change
                            body.classList.remove('no-scroll');
                            html.classList.remove('no-scroll');
                            this.$router.push('/how');
                            this.processing = false;
                        }, 1000);
                        break;

                    case 'tickets':
                        //check if same route is clicked
                        if(this.$route.path === '/manage/tickets'){
                            this.$bus.$emit('close-submenu');
                        }
                        setTimeout(() => {
                            //emit logout to close navbar menu
                            body.classList.remove('no-scroll');
                            html.classList.remove('no-scroll');
                            this.$router.push('/manage/tickets');
                            this.processing = false;
                        }, 1000);
                        break;

                    case 'logout':
                        setTimeout(() => {
                            body.classList.remove('no-scroll');
                            html.classList.remove('no-scroll');
                            this.$store.commit('UNSET_USER');
                            this.$router.push('/');
                            this.processing = false;
                        }, 1000);
                }
            },
        },
        watch: {
            '$route'() {
                this.show = false;
            }
        },
    }
</script>

<style lang="scss">
  @import "../assets/styles/MANAGE/main";
</style>
