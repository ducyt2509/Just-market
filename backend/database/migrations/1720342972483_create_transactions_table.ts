import { transactionStatus } from '#enums/status.enum'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('amount').notNullable(),
        table.enum('status', Object.keys(transactionStatus)).notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE')
      table.integer('buyer_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('seller_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
