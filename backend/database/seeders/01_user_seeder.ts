import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const userData = []

    for (let i = 1; i <= 50; i++) {
      const user = {
        fullName: `user0${i < 10 ? `0${i}` : i}`,
        email: `user0${i < 10 ? `0${i}` : i}@gmail.com`,
        password: '123456',
        role_id: 1,
      }
      userData.push(user)
    }

    await User.createMany(userData)
  }
}
