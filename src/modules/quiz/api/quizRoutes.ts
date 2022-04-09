import { Application } from 'express'
import { QuizController } from './quizController'

export const applyQuizRoutes = (app: Application): void => {
  const userController = new QuizController()
  app.post('/quiz', userController.create)
  app.get('/quiz', userController.list)
}
