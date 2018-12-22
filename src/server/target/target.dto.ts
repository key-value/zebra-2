import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateTargetDto {
    @ApiModelProperty({ required: true })
    name: string;

    @ApiModelPropertyOptional() description?: string;
  }