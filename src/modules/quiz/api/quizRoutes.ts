import { Application } from 'express'
import { QuizController } from './quizController'

export const applyQuizRoutes = (app: Application): void => {
  const quizController = new QuizController()
  app.post('/quiz', quizController.create)
  app.get('/quiz', quizController.list)
  app.get('/quiz/stats', quizController.getStats)
}
