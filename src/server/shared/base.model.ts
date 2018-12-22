import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

export class BaseModelVm {
  @PrimaryGeneratedColumn()
  Id?: number;
  @CreateDateColumn() createdDate: Date;
  @UpdateDateColumn() updatedDate: Date;
}
