import { offerStatus } from '#enums/status.enum'
import CustomException from '#exceptions/custom_exception'
import { IPagination } from '#interfaces/common.interface'
import { IOfferPayload } from '#interfaces/offers.interface'
import { IUser } from '#interfaces/users.interface'
import Offer from '#models/offer'
import Product from '#models/product'
import User from '#models/user'
import { DateTime } from 'luxon'

class OfferService {
  async findManyWithPagination({ page, perPage, query }: IPagination) {
    console.log('Received query:', query)

    const offerQuery = Offer.query().preload('user').preload('product')

    if (query) {
      Object.keys(query).forEach((key) => {
        if (query[key] !== undefined && key !== 'page' && key !== 'perPage') {
          offerQuery.where(key, query[key])
        }
      })
    }

    const offer = await offerQuery.paginate(page, perPage)
    console.log(offerQuery.toSQL().sql)

    return offer
  }

  async findOneById(id: number) {
    const record = await Offer.findBy('id', id)

    if (!record) {
      throw new Error(`Offer with id ${id} not found`)
    }

    return record
  }

  async create(payload: IOfferPayload, userAuth: IUser) {
    // Find user and product
    const user = await User.findOrFail(userAuth.id)
    const product = await Product.findOrFail(payload.productId)

    if (user.id === product.userId) {
      throw new CustomException('You cannot make an offer on your own product', 400)
    }

    const isOffered = await user
      .related('offers')
      .query()
      .where('productId', payload.productId)
      .where('expiredAt', '>', DateTime.now().toJSDate())
      .first()

    if (isOffered) {
      throw new CustomException('You have already made an offer on this product', 400)
    }

    if (user.amount < payload.amount) {
      throw new CustomException('Insufficient balance', 400)
    }

    const expiredAt = DateTime.now().plus({ days: 7 })

    const offer = await user.related('offers').create({
      amount: payload.amount,
      status: offerStatus.PENDING,
      productId: product.id,
      userId: user.id,
      expiredAt: expiredAt,
    })

    return offer
  }

  public async update(
    offerId: number,
    action: keyof typeof offerStatus | offerStatus
  ): Promise<Offer> {
    const offer = await Offer.findOrFail(offerId)
    if (offer.status !== offerStatus.PENDING) {
      throw new CustomException('Offer is not pending', 400)
    }

    switch (action) {
      case offerStatus.ACCEPTED:
        offer.status = offerStatus.ACCEPTED
        break
      case offerStatus.REJECTED:
        offer.status = offerStatus.REJECTED
        break
      default:
        throw new CustomException('Invalid action', 400)
    }

    await offer.save()

    return offer
  }
}

export default new OfferService()
