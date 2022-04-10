import { Types } from 'mongoose'

export interface IQuiz extends ICreateQuiz {
  _id?: Types.ObjectId
}

export interface ICreateQuiz {
  userId: Types.ObjectId
  questions: IQuestion[]
}

export interface IQuestion {
  question: string
  qid: string
  answers: string[]
  answerIndex: number
}

export interface IStatResponse {
  numberOfAttempts: number
  completion: number
  scores: IUserScore[]
}

export interface IUserScore {
  userId: Types.ObjectId
  score: number
}

export interface IFilterQuizes {
  ids?: string[]
  userIds?: string[]
}
