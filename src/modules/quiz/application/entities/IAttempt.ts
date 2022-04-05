import { Types } from 'mongoose'

export interface IAttempt {
  userId: Types.ObjectId
  quizId: Types.ObjectId
  score: number
  wrongAnswers: IAnswer[]
}

export interface IAnswer {
  qid: string
  answer: string
}
