import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger'

export class CreateTargetDto {

    @ApiModelProperty()
    id: number

    @ApiModelProperty({ required: true })
    targetName: string

    @ApiModelPropertyOptional() description?: string
  }