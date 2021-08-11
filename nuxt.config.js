export default {

//target has to be set at static for application to deploy

target:'static',


  generate: {
    fallback: true
  },

  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    //title: process.env.npm_package_name || 'ea',
    title: 'easyevent',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimum-scale=1.0' },
      { hid: 'description', name: 'description', content: 'Thinking of the best way to host events, and sell event tickets? Think easy event' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#162438' },
  /*
  ** Global CSS
  */
  css: [
    "~assets/styles/main.scss"
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/vue-moment',
    '~plugins/vue-datepicker',
    '~/plugins/directives',
    '~/plugins/vue-qrcode',
    '~/plugins/vue-transition',
    '~plugins/vuelidate',
    '~/plugins/global-bus',
    {src: '~plugins/ga.js', mode: 'client'}
],
  /*
  ** Nuxt.js dev-modules
  */
  devModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/toast',
  ],

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'https://dev.geteasypayng.com/api/v1'
    //baseURL: 'https://159.65.55.81:20000/api/v1'
  },
  toast:{
    duration: 3000,
    className: 'toast',
    singleton: true
  },
  env:{

  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        // Disable a plugin by passing false as value
        autoprefixer: {}
      },
    }
  }
}
