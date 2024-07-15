import { IUser } from '#interfaces/users.interface'
import User from '#models/user'

class UserService {
  async update(payload: Partial<IUser>, userId: number | string) {
    const user = await User.findOrFail(userId)
    user.merge(payload)
    await user.save()

    return user
  }
}

export default new UserService()
