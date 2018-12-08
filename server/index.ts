import * as express from 'express'
import 'dotenv/config'
import 'reflect-metadata'
import 'source-map-support/register'
import { ApplicationModule } from './app/app.module'
// import { uniqueEmail } from './common/rules'
import { Startup, StartupConfiguration } from './startup'
const { NODE_ENV = 'development', PORT = 6333 } = process.env

const config: StartupConfiguration = {
  ApplicationModule,
  indicative: {
    defaultMessages: {
      email: 'The {{field}} field is not valid.',
      integer: 'The {{field}} field must be an integer.',
      required: 'The {{field}} field is required.',
      string: 'The {{field}} field must be a string.'
    },
    customRules: {
      // uniqueEmail
    }
  }
}

new Startup(config).main().then(
  async ({ app, server, nuxt }) => {
    if (NODE_ENV !== 'production')
      await Startup.configureNuxtBuilder(nuxt)
    // app.use(nuxt.render)
    await app.listen(+PORT, () => { console.log(`${PORT}`) })
  },
  e => {
    console.error(e)
    process.exit(1)
  }
)

process.on('unhandledRejection', e => {
  console.error(`[UnhandledRejection]`, e)
})
