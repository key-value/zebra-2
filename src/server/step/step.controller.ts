import { Controller, Delete, Put, Post, Get, Body, Param } from '@nestjs/common'
import { ApiUseTags } from '@nestjs/swagger'
import { CreateStepDto } from './step.dto'
import { Step } from '../models'
import { StepService } from './step.service'
import { ModelUtility } from '../../common/model.utility'

@ApiUseTags('step')
@Controller('step')
export class StepController {
    constructor(
      private readonly stepService: StepService,
    ) {}

    @Get(`:id`)
    async getOne(@Param('id')id: number): Promise<Step> {
      return await this.stepService.get(id)
    }

    @Get()
    async getAll(): Promise<Step[]> {
      return await this.stepService.getAll()
    }

    @Post()
    async add(@Body() body: CreateStepDto) {
       const step = ModelUtility.merge(new Step(), CreateStepDto)
       await this.stepService.add(step)
    }
    @Put(':id')
    async update(@Param('id') id: number, @Body() body: CreateStepDto) {
        let step = await this.stepService.getOne(id)
        step = ModelUtility.merge(step, CreateStepDto)
        await this.stepService.update(step)
    }
    @Delete(':id')
    async delete(@Param('id') id: number){
      await this.stepService.delete(id)
    }
  }
