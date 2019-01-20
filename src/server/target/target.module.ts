import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { TargetController } from './target.controller'
import { Target } from '../models'
import TargetService from './target.service'

@Module({
  imports: [TypeOrmModule.forFeature([Target])],
  controllers: [TargetController],
  providers: [TargetService],
})
export class TargetModule {}
