import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TargetModule } from './target/target.module'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TargetModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'zebra_two',
      synchronize: true,
      entities: [ __dirname + '/models/*{.ts,.js}'],
      cache: false,
    }),
  ],
controllers: [AppController],
  providers : [AppService],
})
export class ApplicationModule {}
