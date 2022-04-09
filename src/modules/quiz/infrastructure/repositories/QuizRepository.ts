import { ICreateQuiz, IFilterQuizes, IQuiz } from '@quiz/application/entities/IQuiz'
import { IQuizRepository } from '@quiz/application/repositories/IQuizRepository'
import { Quiz } from '@quiz/infrastructure/schemas/Quiz'

export class QuizRepository implements IQuizRepository {
  public async create(attrs: ICreateQuiz): Promise<IQuiz | undefined> {
    try {
      const request = await Quiz.create(attrs)
      return request
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

  public async list(filters: IFilterQuizes): Promise<IQuiz[] | undefined> {
    try {
      const request = await Quiz.find(this.applyFilters(filters))
      return request
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

  private applyFilters(filters: IFilterQuizes) {
    const body: any = {}
    if (filters?.ids) {
      body['_id'] = { $in: filters?.ids }
    }
    if (filters?.userIds) {
      body['userId'] = { $in: filters?.userIds }
    }

    return {}
  }
}
