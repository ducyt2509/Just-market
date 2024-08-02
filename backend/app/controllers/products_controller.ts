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

    response.ok({
      data: await ProductService.create(payload, auth.user as any),
      message: 'Product created successfully',
    })
  }

  async update({ request, auth, response }: HttpContext) {
    console.log('request.all()', request.all())
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

    response.ok({
      data: await ProductService.update(payload, request.params().id, auth.user as any),
      message: 'Product updated successfully',
    })
  }

  async findOneById({ response, request }: HttpContext) {
    response.ok({
      data: await ProductService.getProductById(request.params().id, request.qs()),
      message: 'Product found successfully',
    })
  }

  async delete({ response, request, auth }: HttpContext) {
    response.ok({
      data: await ProductService.delete(request.params().id, auth.user as any),
      message: 'Product deleted successfully',
    })
  }

  async findManyWithPagination({ response, request }: HttpContext) {
    const { page, perPage, ...query } = request.qs()
    response.ok(await ProductService.findManyWithPagination({ query, page, perPage }))
  }
}
