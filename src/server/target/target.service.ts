import { Injectable, Component } from '@nestjs/common'
import { Target } from '../models'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export default class TargetService {
  constructor(
    @InjectRepository(Target)
    private readonly targetRepository: Repository<Target>,
  ) {}

  async getAll(): Promise<Target[]> {
    return await this.targetRepository.find()
  }

  async add(name: string, description?: string) {
    const target = new Target()
    target.targetName = name
    target.description = description
    target.state = 0
    const installResult = await this.targetRepository.insert(target)
    console.log(installResult)
  }
}
