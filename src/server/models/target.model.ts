import { BaseModelVm } from './../shared/base.model';
import { Long, Table, Column, Entity } from 'typeorm';

@Entity()
export default class Target extends BaseModelVm {
  constructor() {super(); }
  @Column()
  public TargetName: string;
  @Column()
  public state: number;
  @Column({ nullable: true })
  public UserId: number;
  @Column()
  public description: string;
}
