import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger'

export class CreateTaskDto {

    @ApiModelProperty()
    id: number

    @ApiModelProperty({ required: true })
    targetName: string

    @ApiModelPropertyOptional() description?: string
  }