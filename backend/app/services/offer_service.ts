import { IPagination } from '#interfaces/common.interface'
import { IOfferPayload } from '#interfaces/offers.interface'
import { IUser } from '#interfaces/users.interface'
import Offer from '#models/offer'
import User from '#models/user'
import db from '@adonisjs/lucid/services/db'

class OfferService {
  async findManyWithPagination({ page, perPage, query }: IPagination) {
    if (query) {
      return await Offer.query().where(query).paginate(page, perPage)
    } else {
      return await Offer.query().paginate(page, perPage)
    }
  }

  async findOneById(id: number) {
    const record = await Offer.findBy('id', id)

    if (!record) {
      throw new Error(`Offer with id ${id} not found`)
    }

    return record
  }

  async create(payload: IOfferPayload, userAuth: IUser) {
    const trx = await db.transaction()
    try {
      const offers = await Offer.create(payload)
      // await offers.related('user').associate(userAuth.id);
      // aaw

      await trx.commit()
    } catch (error) {
      await trx.rollback()
    }
  }
}

export default new OfferService()
