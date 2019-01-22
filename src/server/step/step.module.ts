import { Module } from '@nestjs/common'
import { StepController } from './step.controller'
import { StepService } from './step.service'
import { Step } from '../models'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Step])],
  controllers: [StepController],
  providers: [StepService],
})
export class StepModule {}
