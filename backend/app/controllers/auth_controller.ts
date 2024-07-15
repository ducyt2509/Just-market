// import type { HttpContext } from '@adonisjs/core/http'

import { ILoginPayload, IRegisterPayload } from '#interfaces/auth.interface'
import AuthService from '#services/auth_service'
import { loginValidator, registerValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AuthController {
  async login({ request, response }: HttpContext) {
    const { email, password }: ILoginPayload = await loginValidator.validate(request.body())
    const { accessToken, user } = await AuthService.login(email, password)
    // response.cookie('refresh_token', refreshToken.toJSON().token, {
    //   httpOnly: true,
    // })

    return response.ok({
      access_token: accessToken.toJSON().token,
      ...user.serialize(),
    })
  }

  async register({ request, response }: HttpContext) {
    const payload: IRegisterPayload = await registerValidator.validate(request.body())
    const user = await AuthService.register(payload)
    return response.created(user)
  }
}
