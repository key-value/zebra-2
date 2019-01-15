import { Injectable, Component, HttpException } from '@nestjs/common'
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
    const a = await this.targetRepository.find()
    return a
  }

  async add(name: string, description?: string) {
    const target = new Target()
    target.targetName = name
    target.description = description
    target.state = 0
    const installResult = await this.targetRepository.insert(target)
    const a = await this.targetRepository.find()
    console.log(installResult)
  }

  async update(id: number, name: string , description: string){
    const target = await this.targetRepository.findOne(id)
    if (target == null){
      throw new Error('Method not implemented.')
    }
    target.targetName = name
    target.description = description
    console.log(target)
    await this.targetRepository.save(target)
    const a = await this.targetRepository.findOne(id)
    console.log(a)
  }

  async delete(id: any) {
    const target = await this.targetRepository.findOne(id)
    if (target == null){
      throw new Error('Method not implemented.')
    }
    this.targetRepository.remove(target)
  }
}
