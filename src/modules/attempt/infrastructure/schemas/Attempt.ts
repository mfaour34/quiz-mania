import { IAnswer, IAttempt } from '@attempt/application/entities/IAttempt'
import { Schema, model } from 'mongoose'

const wrongAnswersSchema = new Schema<IAnswer>({
  answer: String,
  qid: String,
})

const attemptSchema = new Schema<IAttempt>({
  quizId: { type: Schema.Types.ObjectId, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
  score: { type: Number, required: true },
  wrongAnswers: { type: [wrongAnswersSchema], required: true },
})

export const Attempt = model<IAttempt>('Attempt', attemptSchema)
