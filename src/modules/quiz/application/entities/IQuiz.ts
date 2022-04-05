import { Types } from 'mongoose'

export interface IQuiz {
  userId: Types.ObjectId
  questions: IQuestion[]
}

export interface IQuestion {
  question: string
  qid: string
  answers: string[]
  answerIndex: number
}
