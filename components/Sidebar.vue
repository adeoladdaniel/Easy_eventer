<template>
  <div class="sidebar-container" :class="{sidebarDisplay: toggleActive}">
    <nav class="sidebar">
      <ul>
        <li class="sidebar-item">
          <router-link to="/find">events</router-link>
        </li>
        <li class="sidebar-item">
          <router-link to="/works">how it works</router-link>
        </li>
        <li class="sidebar-item">
          <router-link to="/company">our company</router-link>
        </li>
        <li class="sidebar-item">
          <router-link to="/help">help</router-link>
        </li>
        <li class="sidebar-item">
          <router-link to="/login">login</router-link>
        </li>
        <li class="sidebar-item">
          <router-link to="/register">register</router-link>
        </li>
        <li class="sidebar-item">
          <router-link to="/manage">manage</router-link>
        </li>
      </ul>

      <!-- <div class="profile">
        <router-link to="/login"> <img src="../assets/icons/user1.svg" alt="User Profile" /> </router-link>
      </div> -->
    </nav>
  </div>
</template>

<script>
    export default {
        name: "sidebar",
        data() {
            return {
                toggleActive: true,
            }
        },
        mounted() {
            this.$root.$on('toggled', () => {
                this.toggleActive = !this.toggleActive;
            })
        }
    }
</script>

<style lang="scss" scoped>
.sidebar-container {
  position: absolute;
  top: 60px;
  background-color: rgba(255, 255, 255, 0.979);
  width: 100%;
  height: 100vh;
  z-index: 999;

  .sidebar {
    position: absolute;
    right: 0;
    width: 80%;
    margin-top: 4px;
    background: #fff;
    box-shadow: 0px 0px 4px #fff;

    ul {
      .sidebar-item {
        list-style: none;
        a {
          font-family: DINPro-Light, sans-serif;
          display: block;
          padding: 20px;
          border-bottom: .5px solid #c2c5ca;
          color: #707070;
        }
      }
    }

    .profile {
        margin-top: 30vh;
        width: 50px;
        height: 50px;
        margin-left: 20px;
        margin-bottom: 20px;

         img {
             width: 100%;
         }
    }
  }
}

.sidebarDisplay {
    display: none;
}

@media screen and (min-width: 769px) and (max-width: 1170px) {
  .sidebar-container {
    display: none;
  }
}

@media screen and (min-width: 1171px) {
  .sidebar-container {
    display: none;
  }
}
</style>

