import { HttpContext } from '@adonisjs/core/http'

export default class CheckPermission {
  public async handle(
    { auth, response }: HttpContext,
    next: () => Promise<void>,
    [role]: number[]
  ) {
    const user = await auth.authenticate()

    if (Number(user.roleId) !== role) {
      return response.unauthorized(`You do not have permission as ${role}`)
    }

    await next()
  }
}
