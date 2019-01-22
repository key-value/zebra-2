import { TaskService } from './task.service'
import { Controller, Delete, Put, Post, Get, Body, Param } from '@nestjs/common'
import { ApiUseTags } from '@nestjs/swagger'
import { Task } from '../models'
import { CreateTaskDto } from './task.dto'

@ApiUseTags('task')
@Controller('task')
export class TaskController {
    constructor(
      private readonly taskService: TaskService,
    ) {}

    @Get('all')
    async getAll(): Promise<Task[]> {
      return await this.taskService.getAll()
    }

    @Post()
    async add(@Body() body: CreateTaskDto) {
      await this.taskService.add(body.targetName)
    }
    @Put()
    async update(@Body() body: CreateTaskDto) {
      await this.taskService.update(body.id, body.targetName)
    }
    @Delete(':id')
    async delete(@Param('id') id: number){
      await this.taskService.delete(id)
    }
  }
