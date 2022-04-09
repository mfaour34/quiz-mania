import { AttemptRepository } from '@attempt/infrastructure/repositories/AttemptRepository'
import { handleHttpError } from '@shared/utils/handleHttpError'
import { Request, Response } from 'express'

export class AttemptController {
  public async create(req: Request, res: Response) {
    const attemptRepo = new AttemptRepository()
    try {
    } catch (error) {
      handleHttpError(res, error)
    }
  }

  public async list(req: Request, res: Response) {
    const attemptRepo = new AttemptRepository()
    try {
    } catch (error) {
      handleHttpError(res, error)
    }
  }
}
