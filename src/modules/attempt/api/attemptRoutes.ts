import { Application } from 'express'
import { AttemptController } from './attemptController'

export const applyAttemptRoutes = (app: Application): void => {
  const attemptController = new AttemptController()
  app.post('/attempt', attemptController.create)
  app.get('/attempt', attemptController.list)
}
