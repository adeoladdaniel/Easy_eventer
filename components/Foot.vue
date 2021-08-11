<template>
  <footer id="foot" >
    <div class="country">
      <div class="select" :class="{open:openCountry}" @click="openCountry = !openCountry">
        <div class="option">
          <img src="~/assets/images/nigeria.png"> <span>Nigeria</span>
        </div>
        <div class="option" @click="kenya">
          <img src="~/assets/images/kenya.png"> <span>Kenya</span>
        </div>
      </div>
    </div>


    <div class="links">
      <div class="policy">
        <a href="#">Terms</a>
        <a href="#">Privacy</a>
        <a>&copy; {{date}} easyevent</a>
      </div>
      <div class="social-links">
        <a target="_blank" href="https://www.facebook.com/easyevent13"><img src="@/assets/icons/facebook.svg" alt="Easy on Facebook"></a>
        <a target="_blank" href="https://www.instagram.com/easyevent13"><img src="@/assets/icons/instagram.svg" alt="Easy on Instagram"></a>
        <a target="_blank" href="https://twitter.com/EasyEvent13"><img src="@/assets/icons/twitter.svg" alt="Easy on Twitter"></a>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    data(){
      return{
        openCountry: false,
         date: new Date().getFullYear()
      }
    },
    methods:{
      kenya(){
        window.location.href = 'https://ke.easyevent.live'
      }
    }
  }
</script>
