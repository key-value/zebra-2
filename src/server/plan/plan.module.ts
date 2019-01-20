import { Module } from '@nestjs/common'
import PlanService from './plan.service'
import { PlanController } from './plan.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Plan } from '../models'

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  providers: [PlanService],
  controllers: [PlanController],
})
export class PlanModule {}
