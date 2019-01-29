import {
  Get,
  Controller,
  Inject,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common'
import { Plan } from '../models'
import PlanService from './plan.service'
import { ApiUseTags } from '@nestjs/swagger'
import { CreatePlanDto } from './plan.dto'
import { ModelUtility } from '../shared/model.utility'
@ApiUseTags('plan')
@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get()
  root(): string {
    return '1111'
  }
  @Get('all')
  async getAll(): Promise<Plan[]> {
    return await this.planService.getAll()
  }

  @Post()
  async add(@Body() body: CreatePlanDto) {
    const plan = ModelUtility.merge(new Plan(), body)
    await this.planService.add(plan)
  }
  @Put()
  async update(@Body() body: CreatePlanDto) {
    const plan = ModelUtility.merge(new Plan(), body)
    await this.planService.update(plan)
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.planService.delete(id)
  }

}
