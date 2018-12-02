import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiOperation, ApiUseTags } from '@nestjs/swagger'

@ApiUseTags('target')
@Controller('target')
export class TargetController {
  constructor () {

  }
  @Post()
  @ApiOperation({ title: 'Returns API status' })
  async create () {
    return 2
  }
}
