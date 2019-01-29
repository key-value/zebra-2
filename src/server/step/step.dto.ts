import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger'

export class CreateStep{

    @ApiModelPropertyOptional()
    public stepName: string
    @ApiModelPropertyOptional()
    public state: boolean
    @ApiModelPropertyOptional()
    public taskId: number
}