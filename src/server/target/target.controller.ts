import { Get, Controller, Inject, Post, Body, Put, Delete, Param } from '@nestjs/common'
import { Target } from '../models'
import TargetService from './target.service'
import { CreateTargetDto } from './target.dto'
import { isNumber } from 'util'

@Controller('target')
export class TargetController {
  constructor(
    private readonly targetService: TargetService,
  ) {}

  @Get()
  root(): string {
    return '1111'
  }
  @Get('all')
  async getAll(): Promise<Target[]> {
    const a = this.targetService.getAll()
    console.log(a)
    return a
  }

  @Post()
  async add(@Body() body: CreateTargetDto) {
    await this.targetService.add(body.targetName, body.description)
    console.log('add')
  }
  @Put()
  async update(@Body() body: CreateTargetDto) {
    await this.targetService.update(body.id, body.targetName, body.description)
    console.log('update')
  }
  @Delete(':id')
  async delete(@Param('id') id: number){
    await this.targetService.delete(id)
    console.log('update')
  }
}
