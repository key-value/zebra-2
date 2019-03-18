import { Column, Entity } from 'typeorm'

import { BaseModelVm } from './../shared/base.model'

@Entity()
export default class Plan extends BaseModelVm {
  constructor() {
    super()
  }
  @Column()
  public planName: string
  @Column({ nullable: true })
  public beginTime: Date
  @Column({ nullable: true })
  public endTime: Date
  @Column()
  public description: string
  @Column()
  public targetId: number
  @Column()
  public expectations: string
  @Column()
  public minExpectations: string
  @Column()
  public expected: string
  @Column()
  public expectedNumber: number

}
