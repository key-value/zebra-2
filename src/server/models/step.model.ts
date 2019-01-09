import { BaseModelVm } from './../shared/base.model'
import { Long, Table, Column, Entity } from 'typeorm'

@Entity()
export default class Step extends BaseModelVm {
  constructor() {
    super()
  }
  @Column()
  public stepName: string
  @Column()
  public state: boolean
  @Column()
  public index: number
  @Column()
  public taskId: number
}
