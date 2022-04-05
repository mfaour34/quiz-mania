import express, { Application } from 'express'
import { applyHealthCheckRoutes } from './healthCheck/healthCheckRoutes'

export const createApp = (): Application => {
  const app = express()

  applyConfig(app)
  applySystemRoutes(app)

  return app
}

function applyConfig(app: Application) {
  app.disable('x-powered-by')
  app.set('trust proxy', true)
}

function applySystemRoutes(app: Application) {
  applyHealthCheckRoutes(app)
}
