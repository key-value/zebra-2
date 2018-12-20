import { Table, Column, PrimaryGeneratedColumn } from 'typeorm';

export class BaseModelVm {
  @PrimaryGeneratedColumn()
  createAt?: Date;
  @Column()
  updateAt?: Date;
  Id?: number;
}
