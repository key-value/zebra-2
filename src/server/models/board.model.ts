import { Column, Entity } from 'typeorm'

import { BaseModelVm } from './../shared/base.model'

@Entity()
export default class Board extends BaseModelVm {
  constructor() {
    super()
  }
  @Column()
  public boardName: string
}
