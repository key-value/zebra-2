import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { TargetController } from './target.controller'
import { Target, Plan } from '../models'
import TargetService from './target.service'
import PlanService from '../plan/plan.service'

@Module({
  imports: [TypeOrmModule.forFeature([Target, Plan])],
  controllers: [TargetController],
  providers: [TargetService, PlanService],
})
export class TargetModule {}
