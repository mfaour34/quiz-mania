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

export interface IAnswer {
  qid: string
  answer: string
}

export interface IAttemptFilters {
  ids?: string[]
  userIds?: string[]
  questionIds?: string[]
}
