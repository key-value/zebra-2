import { EntityRepository, Repository } from 'typeorm'

import { User } from '../entity'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByName (name: string): Promise<User | undefined> {
    return this.findOne({ where: { name } })
  }
}
