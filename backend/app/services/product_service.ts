import { productStatus } from '#enums/status.enum'
import { IPagination } from '#interfaces/common.interface'
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
      .where('user_id', userAuth.id)
      .where('status', productStatus.ACTIVE)
      .where('price', payload.price)
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
      image: [JSON.stringify(image)],
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

  async getProductById(productId: number | string, query: any = {}) {
    console.log('query', query)
    const productQuery = Product.query()
      .where('id', productId)
      .preload('offers', (offerQuery) => {
        offerQuery.preload('user')
        offerQuery.preload('product')
      })

    Object.keys(query).forEach((key) => {
      if (query[key] !== undefined) {
        switch (key) {
          case 'name':
            productQuery.where('name', 'like', `%${query[key]}%`)
            break
          case 'category':
            productQuery.where('category', query[key])
            break
          case 'minPrice':
            productQuery.where('price', '>=', query[key])
            break
          case 'maxPrice':
            productQuery.where('price', '<=', query[key])
            break
          default:
            productQuery.where(key, query[key])
        }
      }
    })
    console.log(productQuery.toSQL().sql)

    const product = await productQuery.firstOrFail()

    return product
  }
  async findManyWithPagination({ page, perPage, query }: IPagination) {
    console.log('Received query:', query)

    const productQuery = Product.query().preload('user')

    if (query) {
      Object.keys(query).forEach((key) => {
        if (query[key] !== undefined && key !== 'page' && key !== 'perPage') {
          switch (key) {
            case 'name':
              productQuery.where('name', 'like', `%${query[key]}%`)
              break
            case 'category':
              productQuery.where('category', query[key])
              break
            case 'minPrice':
              productQuery.where('price', '>=', query[key])
              break
            case 'maxPrice':
              productQuery.where('price', '<=', query[key])
              break
            default:
              productQuery.where(key, query[key])
          }
        }
      })
    }

    // Log query for debugging

    const products = await productQuery.paginate(page, perPage)
    console.log(productQuery.toSQL().sql)

    return products
  }
}

export default new ProductService()
