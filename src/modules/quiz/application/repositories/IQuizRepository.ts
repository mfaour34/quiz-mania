/* eslint-disable no-unused-vars */
import { ICreateQuiz, IQuiz, IFilterQuizes, IStatResponse } from '../entities/IQuiz'

export interface IQuizRepository {
  create: (attrs: ICreateQuiz) => Promise<IQuiz | undefined>
  list: (filters: IFilterQuizes) => Promise<IQuiz[] | undefined>
  stats: (quizId: string, userId: string) => Promise<IStatResponse | undefined>
}
