<template>
  <div>
    <!--This is the Navigation component-->
    <Navbar @change="toggleSidebar" :show="show"/>
    <!--end of navigation component-->

    <!--This is the Sidebar component-->
    <Sidebar v-show="sideBar"/>
    <!--end of sidebar component-->

    <Subnav />
    <nuxt/>
    <Footer/>
  </div>
</template>

<script>
    import Navbar from '@/components/manage/Navbar';
    import Subnav from '@/components/manage/Subnav';
    import Footer from '@/components/manage/Footer';
    import Sidebar from '@/components/manage/Sidebar';
    import {mapGetters} from 'vuex';

    export default {
        middleware: 'auth',
        components: {
            Navbar,
            Subnav,
            Footer,
            Sidebar
        },
        data() {
            return {
                sideBar: false,
                show: false,
            }
        },
        computed:{
            ...mapGetters({
                isEditedEvent: 'event/isEditedEvent',
                event: 'event/getEvent',
            })
        },
        methods: {
            toggleSidebar: function () {
                this.sideBar = !this.sideBar;
                this.show = !this.show;
            }
        },
        watch: {
            '$route'() {
                this.sideBar = false;
                this.show = false;
            }
        }
    }
</script>

<style lang="scss">
  @import "../assets/styles/MANAGE/main";
</style>
