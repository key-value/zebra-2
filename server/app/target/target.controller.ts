import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiUseTags } from '@nestjs/swagger'

@ApiUseTags('target')
@Controller('target')
export class TargetController {

  @Get()
  create (): string {
    return '2'
  }
}
