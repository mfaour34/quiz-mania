import { IAnswer, IAttempt, IAttemptFilters, IUserAttempt } from '@attempt/application/entities/IAttempt'
import { IAttemptRepositories } from '@attempt/application/repositories/IAttemptRepository'
import { Attempt } from '@attempt/infrastructure/schemas/Attempt'
import { IQuiz } from '@quiz/application/entities/IQuiz'
import { Quiz } from '@quiz/infrastructure/schemas/Quiz'

export class AttemptRepository implements IAttemptRepositories {
  public async attempt(attrs: IUserAttempt): Promise<IAttempt | undefined> {
    try {
      const quiz = await Quiz.findById(attrs.quizId)
      if (!quiz) {
        console.info(`quiz with id: ${attrs.quizId} not found`)
        return undefined
      }
      const { score, wrongAnswers } = this.checkAnswers(attrs.answers, quiz)
      const request = await Attempt.create({
        score,
        quizId: attrs.quizId,
        userId: attrs.userId,
        wrongAnswers,
      })
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
    if (filters?.quizIds) {
      body['quizId'] = { $in: filters?.quizIds }
    }

    return body
  }

  private checkAnswers(answers: IAnswer[], quiz: IQuiz) {
    let score = 0
    const wrongAnswers: IAnswer[] = []
    answers.forEach(answer => {
      const question = quiz.questions.filter(question => question.qid === answer.qid)[0]
      if (question.answers[question.answerIndex] === question.answers[answer.answerIndex]) {
        score++
      } else {
        wrongAnswers.push({ answerIndex: answer.answerIndex, qid: answer.qid })
      }
    })
    return {
      score,
      wrongAnswers,
    }
  }
}
