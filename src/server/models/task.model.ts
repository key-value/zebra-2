import { BaseModelVm } from './../shared/base.model'
import { Long, Table, Column, Entity } from 'typeorm'

@Entity()
 export default class Task extends BaseModelVm {

    @Column()
    public planId: number
 }