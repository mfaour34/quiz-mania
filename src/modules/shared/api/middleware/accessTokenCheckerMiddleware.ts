import * as express from 'express'
import { isString } from '@shared/utils/string'
import { AccessTokensProvider } from '@shared/types/AccessTokensProvider'

export const getAccessTokenCheckerMiddleware =
  (accessTokensProvider: AccessTokensProvider): express.RequestHandler =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const accessTokens = accessTokensProvider()
    const tokenGiven = req.header('authentication')
    if (isString(tokenGiven) && tokenGiven && accessTokens.includes(tokenGiven)) {
      return next()
    }

    res.sendStatus(401)
  }
