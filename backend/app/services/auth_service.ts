import User from '#models/user'
import { IRegisterPayload } from '#interfaces/auth.interface'
import Role from '#models/role'
import { Secret } from '@adonisjs/core/helpers'

class AuthService {
  async register(payload: IRegisterPayload) {
    const role = await Role.findBy('role_name', 'customer')

    if (!role) throw new Error('Role not found')
    return role.related('users').create({ ...payload })
  }

  async login(email: string, password: string) {
    // const user = await User.findByOrFail('email', 'user@gmail.com')

    const user = await User.verifyCredentials(email, password)

    const accessToken = await User.accessTokens.create(user)
    return { accessToken, user }
  }

  // async refreshToken(token: string) {
  //   const accessToken = await User.refreshToken.verify(new Secret(token))
  //   if (!accessToken) {
  //     throw new Error('Invalid token')
  //   }

  //   const user = await User.query().where('id', Number(accessToken.identifier)).first()
  //   if (!user) {
  //     throw new Error('User not found')
  //   }

  //   const newToken = await User.accessToken.create(user)

  //   return newToken
  // }
}

export default new AuthService()
