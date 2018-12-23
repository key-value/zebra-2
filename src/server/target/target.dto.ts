import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger'

export class CreateTargetDto {
    @ApiModelProperty({ required: true })
    targetName: string

    @ApiModelPropertyOptional() description?: string
  }