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

  async getAll(): Promise<Step[]> {
    return await this.stepRepository.find()
  }

  async getAllByPlan(taskId: number): Promise<Step[]> {
    return await this.stepRepository.find({ taskId })
  }

  async getOne(id: number): Promise<Step> {
    return await this.stepRepository.findOne(id)
  }

  async add(name: string) {
    const step = new Step()
    step.stepName = name
    await this.stepRepository.insert(step)
  }

  async update(id: number, name: string) {
    const target = await this.stepRepository.findOne(id)
    if (target == null) {
      throw new Error('Method not implemented.')
    }
    target.stepName = name
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
