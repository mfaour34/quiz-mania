import { IUserAttempt } from '@attempt/application/entities/IAttempt'
import { AttemptRepository } from '@attempt/infrastructure/repositories/AttemptRepository'
import { handleHttpError } from '@shared/utils/handleHttpError'
import { validateRequired } from '@shared/utils/validateRequired'
import { Request, Response } from 'express'
import _ from 'lodash'

export class AttemptController {
  constructor() {
    //bind all functions to this
    const methodsNames = _(Object.getOwnPropertyNames(AttemptController.prototype)).without('constructor').value()
    _.bindAll(this, methodsNames)
  }
  public async create(req: Request, res: Response) {
    const attemptRepo = new AttemptRepository()
    try {
      const validatedBody = validateRequired(req.body, ['userId', 'quizId', 'answers']) as IUserAttempt
      const request = await attemptRepo.attempt(validatedBody)
      res.status(200).json(request)
    } catch (error) {
      handleHttpError(res, error)
    }
  }

  public async list(req: Request, res: Response) {
    const attemptRepo = new AttemptRepository()
    try {
      const filters = this.getAttributesFromQuery(req)
      const request = await attemptRepo.list(filters)
      res.status(200).json(request)
    } catch (error) {
      handleHttpError(res, error)
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
    if (request.query?.quizId) {
      body['quizIds'] = request.query.quizId as string[]
    }
    return body
  }
}
