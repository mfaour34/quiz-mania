/* eslint-disable no-unused-vars */
import { IAttempt, ICreateAttempt, IAttemptFilters } from '../entities/IAttempt'

export interface IAttemptRepositories {
  attempt: (attrs: ICreateAttempt) => Promise<IAttempt | undefined>
  list: (filters: IAttemptFilters) => Promise<IAttempt[] | undefined>
}
