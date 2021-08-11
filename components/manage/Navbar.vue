<template>
  <section>
    <section id="navbar">
      <div class="navbar-wrapper container">
        <div class="logo" style="cursor: pointer" @click="$emit('home')">
          <a><img style="width: 120px" src="~/assets/icons/easyevent_logo.svg" alt="easyevent logo"></a>
        </div>
        
        <div class="profile">
          <p class="name"> {{user ? user.fname + ' ' + user.lname : null}}</p>
          <div class="dp" :class="{select: toggleSubMenu}">
            <img :src="dp" v-if="dp" @click="toggleSubMenu = ! toggleSubMenu">
            <img v-else src="~assets/icons/user.svg" @click="toggleSubMenu = ! toggleSubMenu">
          </div>
          <div class="sub-menu" :class="{show:toggleSubMenu}">
            <a class="bal"> <small> <b>Balance</b></small> <br> ₦{{user ? user.user_credit_balance : ''}}</a>
            <a @click="$emit('events')" style="cursor: pointer">My Events</a>
            <a @click="$emit('tickets')" style="cursor: pointer">Tickets</a>
            <a @click="$emit('how')" style="cursor: pointer">How it Works</a>
            <a @click="$emit('logout')" style="cursor: pointer">Logout</a>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "Navbar",
        data() {
            return {
                toggleSubMenu: false,
            }
        },
        computed: {
            user() {
                return this.$store.getters.getUser
            },
            dp() {
                return this.user ? this.user.profile_pic : null;
            }
        },
        watch: {
            '$route': function () {
                this.toggleSubMenu = false;
            }
        },
        mounted() {
            this.$bus.$on('close-submenu',()=>this.toggleSubMenu = false)
        }
    }

</script>
