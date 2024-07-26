import { updateUserValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import UserService from '#services/user_service'

@inject()
export class UsersController {
  async update({ request, response }: HttpContext) {
    const payload = await updateUserValidator.validate(request.all())

    response.created(await UserService.update(payload, request.params().id.toString()))
  }

  async aboutMe({ request, response, auth }: HttpContext) {
    response.ok(await UserService.aboutMe(auth.user as any))
  }
}
