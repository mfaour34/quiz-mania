import { Response } from 'express'

export const handleHttpError = (res: Response, error: any) => {
  console.log(error)
  res.status(500).json({ error: { msg: 'internal server error' } })
}
