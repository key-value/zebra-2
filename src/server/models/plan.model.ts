import { BaseModelVm } from './../shared/base.model'
import { Long, Table, Column, Entity } from 'typeorm'

@Entity()
 export default class Plan extends BaseModelVm {
    constructor() { super() }
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

}