import { offerStatus } from '#enums/status.enum'
import Offer from '#models/offer'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    const statuses = Object.values(offerStatus)
    const ownerId = 3

    for (let i = 0; i < 20; i++) {
      const customerId = Math.floor(Math.random() * 9) + 2
      const status = statuses[Math.floor(Math.random() * statuses.length)]

      await Offer.create({
        amount: Math.floor(Math.random() * 30) + 1,
        productId: Math.floor(Math.random() * 10) + 2,
        userId: customerId,
        ownerId: ownerId,
        status: status,
        expiredAt: DateTime.now().plus({ days: 7 }),
      })
    }
  }
}
