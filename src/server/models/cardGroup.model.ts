import { Column, Entity } from 'typeorm'

import { BaseModelVm } from './../shared/base.model'

@Entity()
export default class CardGroup extends BaseModelVm {
  constructor() {
    super()
  }
  @Column()
  public groupName: string
  @Column()
  public boradId: number
  @Column()
  public sort: number
}
