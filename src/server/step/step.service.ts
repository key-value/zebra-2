import { Injectable } from '@nestjs/common'
import { Step } from '../models'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class StepService {
  constructor(
    @InjectRepository(Step)
    private readonly stepRepository: Repository<Step>,
  ) {}

  async get(id: number): Promise<Step> {
    return await this.stepRepository.findOne(id)
  }

  async getAll(): Promise<Step[]> {
    return await this.stepRepository.find()
  }

  async getAllByPlan(taskId: number): Promise<Step[]> {
    return await this.stepRepository.find({ taskId })
  }

  async getOne(id: number): Promise<Step> {
    return await this.stepRepository.findOne(id)
  }

  async add(step: Step) {
    await this.stepRepository.insert(step)
  }

  async update(step: Step) {
    await this.stepRepository.save(step)
  }

  async delete(id: number) {
    const target = await this.stepRepository.findOne(id)
    if (target == null) {
      return
    }
    await this.stepRepository.remove(target)
  }
}
