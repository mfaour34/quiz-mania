import { AccessTokensProvider } from '@shared/types/AccessTokensProvider'
import dotenv from 'dotenv'
dotenv.config()
const env = process.env.API_ACCESS_TOKENS

export const accessTokensProvider: AccessTokensProvider = () => {
  if (!env) {
    return []
  }
  return env
    .split(',')
    .map(t => t.trim())
    .filter(Boolean)
}
