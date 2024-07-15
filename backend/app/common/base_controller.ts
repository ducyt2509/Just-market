import User from '#models/user'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { BaseService } from './base_service.js'

@inject()
export default class BaseController {
  constructor(private readonly _service: any) {}
  async findManyWithPaginate({ user }: HttpContext) {
    const { page, perPage, query, role } = user
    return await this._service.findManyWithPaginate(page, perPage, query, role)
  }

  async createWithoutRelated(payload: any) {
    return this._service.created(await this._service.create(payload))
  }

  async createWithRelations({
    payload,
    relations,
  }: {
    payload: Record<string, any>
    relations: {
      relationName: string
      data: {
        [foreignKey: string]: any
      }
    }[]
  }) {
    return this._service.createWithRelations(payload, relations)
  }

  async delete(id: number) {
    return this._service.delete(id)
  }
}
