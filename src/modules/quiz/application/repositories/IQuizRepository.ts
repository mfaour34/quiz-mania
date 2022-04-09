/* eslint-disable no-unused-vars */
import { ICreateQuiz, IQuiz, IFilterQuizes } from '../entities/IQuiz'

export interface IQuizRepository {
  create: (attrs: ICreateQuiz) => Promise<IQuiz | undefined>
  list: (filters: IFilterQuizes) => Promise<IQuiz[] | undefined>
}
