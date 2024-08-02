import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class IsOwnerDynamic {
  public async handle(
    { auth, params, response }: HttpContext,
    next: () => Promise<void>,
    guards: string[]
  ) {
    const user = await auth.authenticate()
    const [modelName, columnName] = guards

    console.log('Model:', modelName, columnName)

    const model = await db.from(modelName).where('id', params.id).first()
    console.log('Model:', user.id, model)
    if (model == null) {
      return response.notFound({
        status_code: 404,
        errors: [
          {
            message: "'Resource not found'",
          },
        ],
      })
    }
    if (!model || model[columnName] !== user.id) {
      return response.unauthorized({
        status_code: 401,
        errors: [
          {
            message: "'You do not own this resource'",
          },
        ],
      })
    }

    await next()
  }
}
