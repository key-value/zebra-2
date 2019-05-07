import { Get, Controller, Inject, Post, Body, Put, Delete, Param } from '@nestjs/common'
import { Target } from '../models'
import TargetService from './target.service'
import { CreateTargetDto } from './target.dto'
import { ApiUseTags } from '@nestjs/swagger'
import PlanService from '../plan/plan.service'

@ApiUseTags('target')
@Controller('target')
export class TargetController {
  constructor(
    private readonly targetService: TargetService,
    private readonly planService: PlanService,
  ) {}

  @Get('all')
  async getAll(): Promise<Target[]> {
    return await this.targetService.getAll()
  }

  @Get('allLeaf')
  async getAllLeaf(): Promise<Target[]> {
    const targetList = await this.targetService.getAll()
    for (const target in targetList) {
      if (targetList.hasOwnProperty(target)) {
        const element = targetList[target]
        element.planList = await this.planService.getAllbyTargetId(element.id)
      }
    }

    return targetList
  }

  @Post()
  async add(@Body() body: CreateTargetDto) {
    await this.targetService.add(body.targetName, body.description)
  }
  @Put()
  async update(@Body() body: CreateTargetDto) {
    await this.targetService.update(body.id, body.targetName, body.description)
  }
  @Delete(':id')
  async delete(@Param('id') id: number){
    await this.targetService.delete(id)
  }
}
