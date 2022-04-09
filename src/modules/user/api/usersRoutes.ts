import { Application } from 'express'
import { UsersController } from './usersController'

export const applyUsersRoutes = (app: Application): void => {
  const userController = new UsersController()
  app.get('/users', userController.getUsers)
  app.post('/users', userController.create)
}
