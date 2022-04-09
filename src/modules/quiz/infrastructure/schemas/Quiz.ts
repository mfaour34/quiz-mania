import { IQuestion, IQuiz } from '@quiz/application/entities/IQuiz'
import { Schema, model } from 'mongoose'

const questionSchema = new Schema<IQuestion>({
  answerIndex: { type: Number, required: true },
  answers: { type: [String], required: true },
  qid: { type: String, required: true },
  question: { type: String, required: true },
})

const quizSchema = new Schema<IQuiz>({
  questions: { type: [questionSchema], required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
})

export const Quiz = model<IQuiz>('Quiz', quizSchema)
