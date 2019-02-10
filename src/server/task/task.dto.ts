import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger'

export class CreateTaskDto {

    @ApiModelProperty({ required: true })
    targetName: string

    @ApiModelPropertyOptional() description?: string
  }