import { ICreateQuiz, IQuestion } from '@quiz/application/entities/IQuiz'
import { QuizRepository } from '@quiz/infrastructure/repositories/QuizRepository'
import { handleHttpError } from '@shared/utils/handleHttpError'
import { validateRequired } from '@shared/utils/validateRequired'
import { Request, Response } from 'express'
import _ from 'lodash'

export class QuizController {
  constructor() {
    //bind all functions to this
    const methodsNames = _(Object.getOwnPropertyNames(QuizController.prototype)).without('constructor').value()
    _.bindAll(this, methodsNames)
  }

  public async create(req: Request, res: Response) {
    const quizRepo = new QuizRepository()
    try {
      const validatedBody = validateRequired(req.body, ['questions', 'userId']) as ICreateQuiz
      const validatedQuestionsBody = validateRequired(validatedBody.questions, [
        'question',
        'qid',
        'answers',
        'answerIndex',
      ]) as IQuestion[]
      const request = await quizRepo.create({
        ...validatedBody,
        questions: validatedQuestionsBody,
      })
      res.status(200).json(request)
    } catch (error) {
      handleHttpError(res, error)
    }
  }

  public async list(req: Request, res: Response) {
    const quizRepo = new QuizRepository()
    try {
      const filters = this.getAttributesFromQuery(req)
      const request = await quizRepo.list(filters)
      res.status(200).json(request)
    } catch (error) {
      console.error(error)
      return undefined
    }
  }
  private getAttributesFromQuery(request: Request) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body: any = {}
    if (request.query?.id) {
      body['ids'] = request.query.id as string[]
    }
    if (request.query?.userId) {
      body['userIds'] = request.query.userId as string[]
    }
    return body
  }
}
