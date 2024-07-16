import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class PaginateMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const request = ctx.request
    const { page, per_page, ...query } = request.qs()

    const pageNumber = page ? Number(page) : 1
    const perPageNumber = per_page ? Number(per_page) : 10

    request.updateQs({ ...query, page: pageNumber, per_page: perPageNumber })
    console.log('PaginateMiddleware', request.qs())
    await next()

    request.updateQs(query)
  }
}
