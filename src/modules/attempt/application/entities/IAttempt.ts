import { Types } from 'mongoose'

export interface IAttempt extends ICreateAttempt {
  _id?: Types.ObjectId
}

export interface ICreateAttempt {
  userId: Types.ObjectId
  quizId: Types.ObjectId
  score: number
  wrongAnswers: IAnswer[]
}

export interface IUserAttempt {
  userId: Types.ObjectId
  quizId: Types.ObjectId
  answers: IAnswer[]
}

export interface IAnswer {
  qid: string
  answerIndex: number
}

export interface IAttemptFilters {
  ids?: string[]
  userIds?: string[]
  quizIds?: string[]
}
