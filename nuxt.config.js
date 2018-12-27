module.exports = {
  // specify header defaults
  head: {
    title: 'Simple Todos',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'A simple todos project. Built with 💚 using Nuxt & Nest.'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  // customize loading
  loading: {
    color: '#3B8070'
  },
  // specify build directory
  buildDir: '/src/server/nuxt',
  // specify nuxt source directory
  srcDir: 'src/client',
  /*
   ** Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [  '@/plugins/element-ui','~/plugins/axios'],
  // specify additional nuxt modules
  modules: ['@nuxtjs/axios','~/modules/typescript.ts'],
  axios: {
    // prefix: '/api/',
    proxy: true, // Can be also an object with default options
    baseURL: 'http://127.0.0.1:4200/',
  },

  proxy: {
      '/api': { target: 'http://localhost:4200/api'}
  }
};