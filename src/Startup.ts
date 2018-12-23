import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cors from 'cors'
import * as express from 'express'
import * as morgan from 'morgan'
import { Builder, Nuxt } from 'nuxt'

import * as nuxtConfig from '../nuxt.config'
export class Startup {
  constructor(private config: StartupConfiguration) {}

  async main() {
    const server = express()
    await this.configureExpressSettings(server)
    await this.configureExpressMiddleware(server)

    const nuxt = await this.configureNuxt()

    server.get(/^(?!\/?(api|test|swaggerapi)).+$/, (request, response) => {
      nuxt.render(request, response)})
    const app = await NestFactory.create(this.config.ApplicationModule, server)
    app.setGlobalPrefix('api')
    await this.configureNestSwagger(app)

    return { app, server, nuxt }
  }

  private async configureExpressSettings(app: express.Application) {
    app.set('etag', false)
    app.set('trust proxy', true)
    app.set('x-powered-by', false)
  }

  private async configureExpressMiddleware(app: express.Application) {
    app.use(morgan('dev'))
    app.use(cors({ origin: true }))
  }

  private async configureNestSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
      .setTitle('Simple Todos')
      .setVersion('1.0')
      .setDescription('The Todos API description')
      .setBasePath('api')
      .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('/swaggerapi/', app, document)
  }

  private async configureNuxt() {
    const isDev = (nuxtConfig.dev = process.env.NODE_ENV !== 'production')
    const nuxt = new Nuxt(nuxtConfig)
    if (isDev) {
      const builder = new Builder(nuxt)
      await builder.build()
    }
    return nuxt
  }
}
export interface StartupConfiguration {
  ApplicationModule: any
}
