import { once } from 'events'
import * as http from 'http'
import express, { Application, NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { env } from 'process'
import morgan from 'morgan'
import { AccessTokensProvider } from '@shared/types/AccessTokensProvider'
import { applyUsersRoutes } from '@user/api/usersRoutes'
import { getAccessTokenCheckerMiddleware } from '../middleware/accessTokenCheckerMiddleware'
import { applyQuizRoutes } from '@quiz/api/quizRoutes'
import { applyAttemptRoutes } from '@attempt/api/attemptRoutes'
import { applyHealthCheckRoutes } from './healthCheck/healthCheckRoutes'
dotenv.config()

const HTTP_PORT = parseInt(env.HTTP_PORT as string)

let server: http.Server

export const startHttpServer = async (accessTokensProvider: AccessTokensProvider): Promise<http.Server> => {
  const app = createApp(accessTokensProvider)

  server = app.listen(HTTP_PORT)

  await once(server, 'listening')
  const appEnv: unknown = app.get('env')

  console.log(`REST server is running at http://localhost:${HTTP_PORT} in ${String(appEnv)} mode`)

  return server
}

// eslint-disable-next-line no-unused-vars
export function createApp(accessTokensProvider: AccessTokensProvider): express.Express {
  const app = express()
  app.disable('x-powered-by')

  app.use(morgan('short'))
  app.use(helmet())
  // HTTP body size can be configured flexibly on ingress controller level,
  // here define just the upper limit
  app.use(express.json({ limit: '10mb' }))

  app.use(getAccessTokenCheckerMiddleware(accessTokensProvider))

  applySystemRoutes(app)

  app.use(errorHandler)

  return app
}

function applySystemRoutes(app: Application) {
  applyUsersRoutes(app)
  applyQuizRoutes(app)
  applyAttemptRoutes(app)
  applyHealthCheckRoutes(app)
}

// eslint-disable-next-line no-unused-vars
const errorHandler: express.ErrorRequestHandler = (error, _req: Request, res: Response, _next: NextFunction) => {
  // here we keep mapping of application errors (4XX group in fact)
  // to REST HTTP errors;
  // it will be organized and extended in the future
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (error?.code === 'validation') {
    res.status(422).json({
      // js type Error defines `message` as non-enumerable property,
      // need to map it explicitly
      error: {
        ...error,
        code: 'validation',
        message: (error as Error).message,
      } as Error,
    })
  } else {
    console.error(error)
    res.status(500).json({ error: { message: 'Internal server error' } })
  }
}
