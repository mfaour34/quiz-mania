import { IAttempt } from '@attempt/application/entities/IAttempt'
import { AttemptRepository } from '@attempt/infrastructure/repositories/AttemptRepository'
import { ICreateQuiz, IFilterQuizes, IQuiz, IStatResponse, IUserScore } from '@quiz/application/entities/IQuiz'
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

  public async stats(quizId: string, userId: string): Promise<IStatResponse | undefined> {
    try {
      const attemptRepo = new AttemptRepository()
      const quiz = await Quiz.find({ _id: quizId, userId })
      if (!quiz[0]) {
        console.info(`quiz with id: ${quizId} not found`)
        return undefined
      }
      const attempts = await attemptRepo.list({ quizIds: [quiz[0]._id?.toString() as string] })
      return attempts && this.calculateStats(quiz[0], attempts)
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

  private applyFilters(filters: IFilterQuizes) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body: any = {}
    if (filters?.ids) {
      body['_id'] = { $in: filters?.ids }
    }
    if (filters?.userIds) {
      body['userId'] = { $in: filters?.userIds }
    }

    return body
  }

  private calculateStats(quiz: IQuiz, attempts: IAttempt[]): IStatResponse {
    let completion = 0
    const scores: IUserScore[] = []
    attempts.forEach(attempt => {
      if (attempt.score + attempt.wrongAnswers.length === quiz.questions.length) {
        completion++
      }
      scores.push({
        score: attempt.score,
        userId: attempt.userId,
      })
    })
    return {
      completion,
      scores,
      numberOfAttempts: attempts.length,
    }
  }
}
