import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class PaginateMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const request = ctx.request
    const { page, perPage, ...query } = request.qs()

    const pageNumber = page ? Number(page) : 1
    const perPageNumber = perPage ? Number(perPage) : 10

    request.updateQs({ ...query, page: pageNumber, perPage: perPageNumber })
    console.log('PaginateMiddleware', request.qs())
    await next()

    request.updateQs(query)
  }
}
