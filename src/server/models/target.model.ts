import { BaseModelVm } from './../shared/base.model'
import { Long, Table, Column, Entity } from 'typeorm'
import { Plan } from '.'

@Entity()
export default class Target extends BaseModelVm {
  constructor() {super() }
  @Column()
  public targetName: string
  @Column()
  public state: number
  @Column({ nullable: true })
  public UserId: number
  @Column()
  public description: string

  public planList: Plan[]
}
