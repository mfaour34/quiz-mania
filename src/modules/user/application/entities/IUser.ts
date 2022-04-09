import { Types } from 'mongoose'

export interface IUser extends ICreateUser {
  _id?: Types.ObjectId
}

export interface ICreateUser {
  username: string
  email: string
  password: string
}

export interface IListFilters {
  ids?: string[]
}
