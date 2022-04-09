/* eslint-disable no-unused-vars */
import { ICreateUser, IUser, IListFilters } from '../entities/IUser'

export interface IUserRepository {
  create: (attrs: ICreateUser) => Promise<IUser | undefined>
  list: (attrs: IListFilters) => Promise<IUser[] | undefined>
}
