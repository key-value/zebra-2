import { ModelUtility } from './../shared/model.utility'
import { Injectable } from '@nestjs/common'
import { Plan } from '../models'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export default class PlanService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {}

  async getAll(): Promise<Plan[]> {
    return await this.planRepository.find()
  }

  async add(plat: Plan) {
    await this.planRepository.insert(plat)
  }

  async update(newPlan: Plan) {
    const plan = await this.planRepository.findOne(newPlan.id)
    if (plan == null) {
      throw new Error('Method not implemented.')
    }
    plan = ModelUtility.merge(plan, newPlan)
    await this.planRepository.save(plan)
  }

  async delete(id: any) {
    const plat = await this.planRepository.findOne(id)
    if (plat == null) {
      return
    }
    await this.planRepository.remove(plat)
  }
}
