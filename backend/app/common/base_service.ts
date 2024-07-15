import db from '@adonisjs/lucid/services/db'
import { LucidModel, ModelAttributes } from '@adonisjs/lucid/types/model'

export class BaseService<T extends LucidModel> {
  constructor(private model: T) {}

  //: Promise<InstanceType<T>>
  async findManyWithPaginate({
    page,
    perPage,
    query,
  }: {
    page: number
    perPage: number
    query: Record<string, any>
  }) {
    let result

    result = await this.model.query().where(query).paginate(page, perPage)

    const { total } = result.getMeta()

    if (total / perPage < page) {
      throw new Error('Page is not available')
    }

    return {
      data: result.all() as InstanceType<T>[],
      pagination: {
        total,
        perPage,
        page,
      },
    }
  }

  public async createWithRelations(data: any, relations: any[], userId: number, role: string) {
    const trx = await db.transaction()

    try {
      if (role !== 'owner' && role !== 'admin') {
        data.user_id = userId
      }

      const record = await this.model.create(data, { client: trx })

      await Promise.all(
        relations.map(async (relation: any) => {
          const relationInstance = await record
            .related(relation.relationName)
            .create(relation.data, { client: trx })
          return relationInstance
        })
      )

      await trx.commit()

      return record
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }

  async createWithoutRelated(data: Partial<ModelAttributes<InstanceType<T>>>) {
    return this.model.create(data)
  }

  async update(id: number, data: Partial<ModelAttributes<InstanceType<T>>>) {
    const model = (await this.model.find(id)) as InstanceType<T> | null
    if (model) {
      model.merge(data)
      await model.save()
    }
    return model
  }

  async delete(id: number) {
    const model = (await this.model.find(id)) as InstanceType<T> | null
    if (model) {
      await model.delete()
    }
    return model
  }
}
