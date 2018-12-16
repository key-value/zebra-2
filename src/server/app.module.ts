import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TargetModule } from './target/target.module';

@Module({
  imports: [TargetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class ApplicationModule {
}
