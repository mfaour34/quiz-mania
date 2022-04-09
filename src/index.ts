import './sideEffectImports'
import { startHttpServer } from '@shared/api/http'
import { mongoConnect } from '@shared/infrastructure/mongo/mongoConnect'
// import { AccessTokensProvider } from '@shared/types/AccessTokensProvider'

startApp().catch(error => {
  console.log(error)
  process.abort()
})

async function startApp() {
  mongoConnect()

  await startHttpServer(undefined)
}
