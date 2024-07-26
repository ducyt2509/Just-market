import ProductService from '#services/product_service'
import { createProductValidator, updateProductValidator } from '#validators/product'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ProductsController {
  async create({ request, auth, response }: HttpContext) {
    const { productName, price, quantity, description } = request.all()
    const image = request.files('image', { extnames: ['jpg', 'png'], size: '10mb' })

    const data = {
      productName,
      price,
      quantity,
      description,
      image,
    }

    const payload = await createProductValidator.validate(data)

    response.ok(await ProductService.create(payload, auth.user as any))
  }

  async update({ request, auth, response }: HttpContext) {
    const { productName, price, quantity, description, status } = request.all()
    const image = request.files('image', { extnames: ['jpg', 'png'], size: '10mb' })

    const data = {
      productName,
      price,
      quantity,
      description,
      image,
      status,
    }

    const payload = await updateProductValidator.validate(data)

    response.ok(
      await ProductService.update(payload, request.params().id.toString(), auth.user as any)
    )
  }

  async findOneById({ response, request, auth }: HttpContext) {
    response.ok(
      await ProductService.getProductById(request.params().id, request.qs())
    )
  }

  async delete({ response, request, auth }: HttpContext) {
    response.ok(await ProductService.delete(request.params().id, auth.user as any))
  }

  async findManyWithPagination({ response, request }: HttpContext) {
    const { page, perPage, ...query } = request.qs()
    response.ok(await ProductService.findManyWithPagination({ query, page, perPage }))
  }
}
