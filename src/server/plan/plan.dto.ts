import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger'

export class CreatePlanDto {

    @ApiModelProperty()
    id: number

    @ApiModelProperty({ required: true })
    planName: string

    @ApiModelPropertyOptional()
    description?: string
    @ApiModelPropertyOptional()
    public beginTime: Date
    @ApiModelPropertyOptional()
    public endTime: Date
    @ApiModelPropertyOptional()
    public targetId: number
    @ApiModelPropertyOptional()
    public expectations: string
    @ApiModelPropertyOptional()
    public minExpectations: string
    @ApiModelPropertyOptional()
    public expected: string
    @ApiModelPropertyOptional()
    public expectedNumber: string
  }