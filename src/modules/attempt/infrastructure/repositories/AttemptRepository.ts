import { IAttempt, IAttemptFilters, ICreateAttempt } from '@attempt/application/entities/IAttempt'
import { IAttemptRepositories } from '@attempt/application/repositories/IAttemptRepository'
import { Attempt } from '@attempt/infrastructure/schemas/Attempt'

export class AttemptRepository implements IAttemptRepositories {
  public async attempt(attrs: ICreateAttempt): Promise<IAttempt | undefined> {
    try {
      const request = await Attempt.create(attrs)
      return request
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

  public async list(attrs: IAttemptFilters): Promise<IAttempt[] | undefined> {
    try {
      const filters = this.applyFilters(attrs)
      const request = await Attempt.find(filters)
      return request
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  private applyFilters(filters: IAttemptFilters) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body: any = {}
    if (filters?.ids) {
      body['_id'] = { $in: filters?.ids }
    }
    if (filters?.userIds) {
      body['userId'] = { $in: filters?.userIds }
    }
    if (filters?.questionIds) {
      body['questionId'] = { $in: filters?.questionIds }
    }

    return body
  }
}
