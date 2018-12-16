import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import * as express from 'express';
import * as morgan from 'morgan';

export class Startup {
    constructor(private config: StartupConfiguration) {}

    async main() {
        const server = express();
        await this.configureExpressSettings(server);
        await this.configureExpressMiddleware(server);

        const app = await NestFactory.create(this.config.ApplicationModule, server);
        app.setGlobalPrefix('api');
        await this.configureNestSwagger(app);

        return { app, server };
    }

      private async configureExpressSettings(app: express.Application) {
        app.set('etag', false);
        app.set('trust proxy', true);
        app.set('x-powered-by', false);
      }

      private async configureExpressMiddleware(app: express.Application) {
        app.use(morgan('dev'));
        app.use(cors({ origin: true }));
      }

      private async configureNestSwagger(app: INestApplication) {
        const options = new DocumentBuilder()
          .setTitle('Simple Todos')
          .setVersion('1.0')
          .setDescription('The Todos API description')
          .setBasePath('api')
          .build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('/swaggerapi/', app, document);
      }
}
export interface StartupConfiguration {
    ApplicationModule: any;
}
