import { productStatus } from '#enums/status.enum'
import { IProductPayload } from '#interfaces/products.interface'
import { IUser } from '#interfaces/users.interface'
import Product from '#models/product'
import User from '#models/user'
import { UploadCloudinary } from '../common/cloudinary.js'

class ProductService {
  async create(payload: IProductPayload, userAuth: IUser) {
    const user = await User.findOrFail(userAuth.id)

    const isProductExist = await user
      .related('products')
      .query()
      .where('product_name', payload.productName)
      .first()

    if (isProductExist) {
      throw new Error('Product already exist')
    }
    const imageTMP = payload.image.map((file) => ({ tmpPath: file.tmpPath || '' }))
    const imageLinks = await UploadCloudinary.uploadFiles(imageTMP)
    delete (payload as { image?: any }).image
    const image = imageLinks.files?.map((file) => file.url) || []

    return await user.related('products').create({
      ...payload,
      status: productStatus.ACTIVE,
      image: image,
    })
  }

  async update(data: Partial<IProductPayload>, productId: number | string, userAuth: IUser) {
    const user = await User.findOrFail(userAuth.id)
    const product = await user
      .related('products')
      .query()
      .where('id', productId)
      .where('user_id', userAuth.id)
      .firstOrFail()
    let payload = {}
    if (data.image) {
      const imageTMP = data.image.map((file) => ({ tmpPath: file.tmpPath || '' }))
      const imageLinks = await UploadCloudinary.uploadFiles(imageTMP)
      delete (data as { image?: any }).image
      const image = imageLinks.files?.map((file) => file.url) || []
      product.image = image
      payload = { ...data, image }
    } else {
      payload = data
    }

    product.merge(payload)
    await product.save()

    return product
  }

  async delete(productId: number | string, userAuth: IUser) {
    const user = await User.findOrFail(userAuth.id)
    const product = await user
      .related('products')
      .query()
      .where('id', productId)
      .where('user_id', userAuth.id)
      .firstOrFail()

    await product.delete()

    return product
  }

  async getProductById(productId: number | string, userAuth: IUser) {
    const product = await Product.query()
      .where('id', productId)
      .where('user_id', userAuth.id)
      .firstOrFail()

    return product
  }
}

export default new ProductService()
