import './sideEffectImports'
import { startHttpServer } from '@shared/api/http'
import { mongoConnect } from '@shared/infrastructure/mongo/mongoConnect'
import { accessTokensProvider } from '@shared/utils/accessTokensProvider'

startApp().catch(error => {
  console.log(error)
  process.abort()
})

async function startApp() {
  mongoConnect()

  await startHttpServer(accessTokensProvider)
}
