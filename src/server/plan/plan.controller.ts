import { Get, Controller, Inject, Post, Body, Put, Delete, Param } from '@nestjs/common'
import { Plan } from '../models'
import PlanService from './plan.service'
import { ApiUseTags } from '@nestjs/swagger'

@ApiUseTags('plan')
@Controller('plan')
export class PlanController {
  constructor(
    private readonly planService: PlanService,
  ) {}

  @Get()
  root(): string {
    return '1111'
  }
  @Get('all')
  async getAll(): Promise<Plan[]> {
    return await this.planService.getAll()
  }

  @Post()
  async add(@Body() body: Plan) {
    await this.planService.add(body)
  }
  @Put()
  async update(@Body() body: Plan) {
    await this.planService.update(body.id, body.planName, body.description)
  }
  @Delete(':id')
  async delete(@Param('id') id: number){
    await this.planService.delete(id)
  }
}
