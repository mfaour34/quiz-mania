import { IUser } from '@user/application/entities/IUser'
import { Schema, model } from 'mongoose'

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
})

export const User = model<IUser>('User', userSchema)
