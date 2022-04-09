import { genHash } from '@shared/utils/bcrypt'
import { ICreateUser, IListFilters, IUser } from '@user/application/entities/IUser'
import { IUserRepository } from '@user/application/repositories/IUserRepository'
import { User } from '@user/infrastructure/schemas/User'

export class UserRepository implements IUserRepository {
  public async create(attrs: ICreateUser): Promise<IUser | undefined> {
    try {
      const hashedPass = await genHash(attrs.password)
      const userCreated = await User.create({
        ...attrs,
        password: hashedPass,
      })
      return userCreated
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

  public async list(attrs: IListFilters): Promise<IUser[] | undefined> {
    try {
      const filters = this.applyFilters(attrs)
      const pageFetched = await User.find(filters, '-__v -password')
      return pageFetched
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

  private applyFilters(request: IListFilters) {
    if (request?.ids) {
      return { _id: { $in: request?.ids } }
    }

    return {}
  }
}
