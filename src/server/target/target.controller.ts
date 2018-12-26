import { Get, Controller, Inject, Post, Body } from '@nestjs/common'
import { Target } from '../models'
import TargetService from './target.service'
import { CreateTargetDto } from './target.dto'

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
    return await this.targetService.getAll()
  }

  @Post()
  async add(@Body() body: CreateTargetDto) {
    this.targetService.add(body.targetName, body.description)
  }
  async update(@Body() body: CreateTargetDto) {
    this.targetService.update(body.id, body.targetName, body.description)
  }
}
