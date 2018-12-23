import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm'

export class BaseModelVm {
  @PrimaryGeneratedColumn()
  id?: number
  @CreateDateColumn() createdDate: Date
  @UpdateDateColumn() updatedDate: Date
}
