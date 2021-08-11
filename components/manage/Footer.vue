<template>
  <footer>
    <section id="mobile-footer">
      <div class="foot-line"></div>

      <div class="pages container">
        <span><a href="#">Terms</a></span>
        <span><a href="#">Events</a></span>
        <span><a href="#">Privacy</a></span>
        <span><a href="#">Help</a></span>
      </div>

      <div class="socials container">
        <a target="_blank" href="https://www.facebook.com/easyevent13"><img src="@/assets/icons/facebook.svg" alt="Easy on Facebook"></a>
        <a target="_blank" href="https://www.instagram.com/easyevent13"><img src="@/assets/icons/instagram.svg" alt="Easy on Instagram"></a>
        <a target="_blank" href="https://twitter.com/EasyEvent13"><img src="@/assets/icons/twitter.svg" alt="Easy on Twitter"></a>
      </div>

      <div class="copyright">
        <p> &copy;<b>easy</b>event </p>
      </div>
    </section>

    <section id="footer">
      <ul class="policy">
        <li class="menu-item"><a href="#">Terms</a></li>
        <li class="menu-item"><a href="#">Privacy</a></li>
        <li class="menu-item"><a href="#">&copy; {{date}} easyevent</a></li>
      </ul>
      <ul class="social-links">
        <li><a target="_blank" href="https://www.facebook.com/easyevent13"><img src="~/assets/icons/facebook.svg" alt="Facebook SVG"></a></li>
        <li><a target="_blank" href="https://www.instagram.com/easyevent13"><img src="~/assets/icons/instagram.svg" alt="Instagram SVG"></a></li>
        <li><a target="_blank" href="https://twitter.com/EasyEvent13"><img src="~/assets/icons/twitter.svg" alt="Twitter SVG"></a></li>
      </ul>
    </section>
  </footer>
</template>

<script>
  export default {

    data(){

      return {

        date: new Date().getFullYear()

      }

    }

  }
</script>

<style lang="scss" scoped>

</style>
