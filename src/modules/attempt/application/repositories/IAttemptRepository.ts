/* eslint-disable no-unused-vars */
import { IAttempt, IAttemptFilters, IUserAttempt } from '../entities/IAttempt'

export interface IAttemptRepositories {
  attempt: (attrs: IUserAttempt) => Promise<IAttempt | undefined>
  list: (filters: IAttemptFilters) => Promise<IAttempt[] | undefined>
}
