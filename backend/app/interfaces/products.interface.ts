import { productStatus } from '#enums/status.enum'
import { MultipartFile } from '@adonisjs/core/bodyparser'

export interface IProduct {
  id: number
  name: string
  description: string
  price: number
  createdAt: Date
  updatedAt: Date
}

export interface IProductPayload {
  productName: string
  description: string
  price: number
  quantity: number
  image: MultipartFile[]
  status?: productStatus
}
