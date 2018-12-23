import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { Startup, StartupConfiguration } from './startup'
import { ApplicationModule } from './server/app.module'
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const options = new DocumentBuilder()
//     .setTitle('Cats example')
//     .setDescription('The cats API description')
//     .setVersion('1.0')
//     .build();
//   const document = SwaggerModule.createDocument(app, options);
//   SwaggerModule.setup('swagger-api', app, document);
//   await app.listen(3000);
// }
// bootstrap();

const { PORT = 4200 } = process.env

const config: StartupConfiguration = {
  ApplicationModule,
}

new Startup(config).main().then(
  async ({ app, server, nuxt }) => {
    app.use(nuxt.render)
    await app.listen(+PORT, () => {
      console.log(`${PORT}`)
    })
  },
  e => {
    console.error(e)
    process.exit(1)
  },
)
