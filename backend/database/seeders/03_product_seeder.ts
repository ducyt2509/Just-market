import { productStatus } from '#enums/status.enum'
import Product from '#models/product'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const products = []

    for (let i = 1; i <= 20; i++) {
      const product = {
        productName: `Product ${i}`,
        price: i * Math.floor(Math.random() * 10),
        quantity: 1,
        description:
          'i thiệu với mọi người trang web sử dụng Generative AI (Google Gemini) do team mình tạo ra nhằm hỗ trợ người Việt trong việc tra cứu và tự học tiếng Anh sao cho hiệu quả nhất dựa trên trình độ tiếng Anh của họ. Hiện tại, mọi người có thể dùng nó một cách miễn phí.',
        image: [
          '["https://res.cloudinary.com/dyatlk8t7/image/upload/v1721547370/test/q5v84luhm09yyl92sb4e.png","https://res.cloudinary.com/dyatlk8t7/image/upload/v1721547371/test/qk5qpwnz2q7ofufwow4e.png"]',
        ],
        status: productStatus.ACTIVE,
        userId: 3,
      }

      products.push(product)
    }

    await Product.createMany(products)
  }
}
