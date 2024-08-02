import { productStatus } from '#enums/status.enum'
import vine from '@vinejs/vine'
export const createProductValidator = vine.compile(
  vine.object({
    productName: vine.string().minLength(3).maxLength(255),
    price: vine.number().min(1),
    description: vine.string().minLength(3),
    image: vine.array(vine.file()),
  })
)
export const updateProductValidator = vine.compile(
  vine.object({
    productName: vine.string().minLength(3).maxLength(255).optional(),
    price: vine.number().min(1).optional(),
    description: vine.string().minLength(3).optional(),
    image: vine.array(vine.file()),
    status: vine.enum(productStatus).optional(),
  })
)
