<template>
    <nav id="guest-navbar" :class="{gray : this.$route.name !== 'index'}">
        <div class="easy">
            <nuxt-link to="/">
                <img class="logo" src="~assets/icons/easyevent_logo.svg" alt="Easy Event Logo">
            </nuxt-link>
        </div>

        <div class="toggle">
            <span v-if="isAuth" :class="{select: toggleSubMenu}">
                <img class="dp" @click="toggleSubMenu = ! toggleSubMenu" :src="dp" alt="">
            </span>

            <div v-else class="br" @click="toggleSubMenu = ! toggleSubMenu"><img src="~/assets/icons/user.svg" alt=""></div>

            <div class="sub-menu" :class="{show:toggleSubMenu}">
                <template v-if="isAuth">
                    <a class="bal"> <small> <b>Balance</b></small> <br> ₦{{user.user_credit_balance}}</a>
                    <nuxt-link to="/manage">My Events</nuxt-link>
                    <nuxt-link to="/manage/tickets">Tickets</nuxt-link>
                    <nuxt-link to="how">How it works</nuxt-link>
                    <a  @click="$emit('logout')">Logout</a>
                </template>

                <template v-else>
                    <nuxt-link to="/signup">Sign up</nuxt-link>
                    <nuxt-link to="/login">Sign in</nuxt-link>
                    <nuxt-link to="/how">How it works</nuxt-link>
                </template>
            </div>
        </div>

        <div class="menu" :class="{gray : this.$route.name !== 'index'}">
            <nuxt-link to="/create" class="menu-link"> create event </nuxt-link>

            <nuxt-link to="/how" class="menu-link"> How it works </nuxt-link>

            <span v-if="isAuth" class="dp-holder" :class="{select: toggleSubMenu}">
                <img @click="toggleSubMenu = ! toggleSubMenu" class="dp" :src="dp">
            </span>
            <span v-else>
              <nuxt-link to="/login" class="menu-link" @click="toggleSubMenu = false"> Help</nuxt-link>
              <nuxt-link to="/signup" class="menu-link sign-up" @click="toggleSubMenu = false"> Join</nuxt-link>
            </span>

            <div class="sub-menu" :class="{show : toggleSubMenu}">
                <a class="bal" v-if="isAuth"> <small> <b>Balance</b></small> <br> ₦{{user.user_credit_balance}}</a>
                <a @click="$emit('events')" style="cursor: pointer">My events</a>
                <a @click="$emit('tickets')" style="cursor: pointer">Tickets</a>
                <a @click="$emit('logout')" style="cursor: pointer">Logout</a>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        data() {
            return {
                toggleSubMenu: false
            };
        },
        computed: {
            isAuth() {
                return this.$store.getters.isAuthenticated
            },
            user(){
                return this.$store.getters.getUser
            },
            dp(){
              return this.$store.getters.getUser.profile_pic ? this.$store.getters.getUser.profile_pic : '/user.svg'
            },
        },
        watch: {
            '$route': function() {
                
                this.toggleSubMenu = false;
            }
        },
        
        /*i used a global bus here because guest page navbar does not auto hide the submenu after logout*/
        created() {
            this.$bus.$on('logout', ()=>{
                this.toggleSubMenu = false
            })
        },
        beforeDestroy(){
            this.$bus.$off('logout');
        }
    };
</script>

<style lang="scss" scoped>

</style>
