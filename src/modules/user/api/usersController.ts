import { Request, Response } from 'express'
import { UserRepository } from '@user/infrastructure/repositories/UserRepository'
import { handleHttpError } from '@shared/utils/handleHttpError'
import _ from 'lodash'
import { ICreateUser } from '@user/application/entities/IUser'
import { validateRequired } from '@shared/utils/validateRequired'

export class UsersController {
  constructor() {
    //bind all functions to this
    const methodsNames = _(Object.getOwnPropertyNames(UsersController.prototype)).without('constructor').value()
    _.bindAll(this, methodsNames)
  }

  public async getUsers(req: Request, res: Response) {
    const userRepo = new UserRepository()
    try {
      const filters = this.getAttributesFromQuery(req)
      const request = await userRepo.list({
        ids: filters,
      })
      res.status(200).json({ users: request })
    } catch (error) {
      handleHttpError(res, error)
    }
  }

  public async create(req: Request, res: Response) {
    const userRepo = new UserRepository()
    try {
      const body = validateRequired(req.body, ['username', 'email', 'password'])
      const request = await userRepo.create(body as ICreateUser)
      res.status(200).json(request)
    } catch (error) {
      handleHttpError(res, error)
    }
  }

  private getAttributesFromQuery(request: Request) {
    if (request.query?.id) {
      return request.query.id as string[]
    }
    return undefined
  }
}
