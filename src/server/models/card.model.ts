import { Column, Entity } from 'typeorm'

import { BaseModelVm } from './../shared/base.model'

@Entity()
export default class Card extends BaseModelVm {
  constructor() {
    super()
  }
  @Column()
  public groupId: number
  @Column()
  public stepId: number
}
