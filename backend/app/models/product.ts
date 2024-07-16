import { DateTime } from 'luxon'
import User from './user.js'
import { productStatus } from '#enums/status.enum'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { type HasMany, type BelongsTo } from '@adonisjs/lucid/types/relations'
import Transaction from './transaction.js'
import Offer from './offer.js'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'product_name' })
  declare productName: string

  @column()
  declare price: number

  @column()
  declare quantity: number

  @column()
  declare description: string

  @column({
    consume: (value: string) => JSON.parse(value),
    prepare: (value: Array<string>) => JSON.stringify(value),
  })
  declare image: Array<string>

  @column()
  declare status: productStatus

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Transaction)
  declare transactions: HasMany<typeof Transaction>

  @hasMany(() => Offer)
  declare offers: HasMany<typeof Offer>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
