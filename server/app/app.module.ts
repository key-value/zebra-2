import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import {
  MailerModule,
  RedisModule,
} from 'nestjs-extensions'

const {
  MAILER_TYPE,
  MAILER_ETHEREAL_USERNAME,
  MAILER_ETHEREAL_PASSWORD,
  MAILER_GMAIL_CLIENTID,
  MAILER_GMAIL_CLIENTSECRET,
  MAILER_GMAIL_REFRESHTOKEN,
  MAILER_GMAIL_USER,
  MAILER_MANDRILL_API_KEY,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_AUTH_PASS,
  TYPEORM_CONNECTION,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_SCHEMA,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_LOGGING,
  TYPEORM_SYNCHRONIZE
} = process.env as any

@Global()
@Module({
  modules: [
    MailerModule.forRoot({
      type: MAILER_TYPE,
      ethereal: {
        username: MAILER_ETHEREAL_USERNAME,
        password: MAILER_ETHEREAL_PASSWORD
      },
      gmail: {
        clientId: MAILER_GMAIL_CLIENTID,
        clientSecret: MAILER_GMAIL_CLIENTSECRET,
        refreshToken: MAILER_GMAIL_REFRESHTOKEN,
        user: MAILER_GMAIL_USER
      },
      mandrill: { apiKey: MAILER_MANDRILL_API_KEY }
    }),
    RedisModule.forRoot({
      host: REDIS_HOST,
      port: REDIS_PORT,
      auth_pass: REDIS_AUTH_PASS
    }),
    TypeOrmModule.forRoot({
      host: TYPEORM_HOST,
      port: TYPEORM_PORT,
      database: TYPEORM_SCHEMA,
      username: TYPEORM_USERNAME,
      password: TYPEORM_PASSWORD,
      type: TYPEORM_CONNECTION,
      logging: TYPEORM_LOGGING === 'true',
      synchronize: TYPEORM_SYNCHRONIZE === 'true'
    })
  ],
})
export class ApplicationModule {}