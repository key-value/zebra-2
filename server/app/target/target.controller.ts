import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiImplicitBody, ApiOperation, ApiUseTags } from '@nestjs/swagger'

@ApiUseTags('target')
@Controller('api/target')
export class TargetController {
  constructor () {

  }
  @Get()
  @ApiOperation({ title: 'Returns API status' })
  create (): string {
    return '2'
  }
}
