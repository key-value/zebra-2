import { BaseModelVm } from './../shared/base.model';
import { Long, Table, Column, Entity } from 'typeorm';

@Entity()
class Target extends BaseModelVm {
  constructor(parameters) {super(); }
  @Column()
  public TargetName: string;
  @Column()
  public state: number;
  @Column()
  public UserId: number;
  @Column()
  public description: string;
}
