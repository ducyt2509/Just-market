import type { HttpContext } from '@adonisjs/core/http'

import OfferService from '#services/offer_service'
import { inject } from '@adonisjs/core'
import { CreateOfferValidator } from '#validators/offer'

@inject()
export default class OffersController {
  async findManyWithPagination({ response, request, auth }: HttpContext) {
    const { page, perPage, ...query } = request.qs()
    response.ok(await OfferService.findManyWithPagination({ page, perPage, query }))
  }

  async findOneById({ response, request, auth }: HttpContext) {
    response.ok(await OfferService.findOneById(request.params().id))
  }

  async create({ request, auth, response }: HttpContext) {
    const payload = await CreateOfferValidator.validate(request.all())
    const productId = request.param('id')
    const result = await OfferService.create({ ...payload, productId }, auth.user as any)
    response.ok({
      message: 'Offer created successfully',
      data: result,
    })
  }

  async update({ request, response }: HttpContext) {
    const { action } = request.all()
    response.ok(await OfferService.update(request.params().id, action))
  }
}
