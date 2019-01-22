import { Injectable } from '@nestjs/common'
import { Task } from '../models'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class TaskService {
    constructor(
      @InjectRepository(Task)
      private readonly stepRepository: Repository<Task>,
    ) {}

    async getAll(): Promise<Task[]> {
      return await this.stepRepository.find()
    }

    async getAllByPlanId(planId: number): Promise<Task[]> {
      return await this.stepRepository.find({planId})
    }

    async getOne(id: number): Promise<Task> {
      return await this.stepRepository.findOne(id)
    }

    async add(name: string) {
      const step = new Task()
      step.planTitle = name
      await this.stepRepository.insert(step)
    }

    async update(id: number, name: string) {
      const target = await this.stepRepository.findOne(id)
      if (target == null) {
        throw new Error('Method not implemented.')
      }
      target.planTitle = name
      await this.stepRepository.save(target)
    }

    async delete(id: any) {
      const target = await this.stepRepository.findOne(id)
      if (target == null) {
        return
      }
      await this.stepRepository.remove(target)
    }
  }
