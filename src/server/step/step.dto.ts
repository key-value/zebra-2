import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger'

export class CreateStepDto{

    @ApiModelPropertyOptional()
    public stepName: string
    @ApiModelPropertyOptional()
    public state: boolean
    @ApiModelPropertyOptional()
    public taskId: number
}