import { productStatus } from '#enums/status.enum'
import Product from '#models/product'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const products = []
    const images = [
      'https://res.cloudinary.com/dyatlk8t7/image/upload/v1722522458/test/s4r4vgpv0kxc7ijizeuf.png',
      'https://res.cloudinary.com/dyatlk8t7/image/upload/v1722522457/test/pn50rskjcrdu8uf1wbcw.png',
      'https://res.cloudinary.com/dyatlk8t7/image/upload/v1722522457/test/j8nswlwjtvtbpyf7xbbf.png',
      'https://res.cloudinary.com/dyatlk8t7/image/upload/v1722522457/test/lbs9itgtvnjfs48ogv5n.jpg',
      'https://res.cloudinary.com/dyatlk8t7/image/upload/v1722522457/test/fp5waxj7ghqslwerhmbp.jpg',
      'https://res.cloudinary.com/dyatlk8t7/image/upload/v1722522458/test/gdkvuhzbml7wwczjz0gt.png',
      'https://res.cloudinary.com/dyatlk8t7/image/upload/v1722522457/test/hyydvfhn1aysxue8htzp.png',
      'https://res.cloudinary.com/dyatlk8t7/image/upload/v1722522457/test/bslqetqfngrvrnjuze2h.png',
      'https://res.cloudinary.com/dyatlk8t7/image/upload/v1722522457/test/xfj4cs0v2rwgl7xkb3pj.png',
      'https://res.cloudinary.com/dyatlk8t7/image/upload/v1722522457/test/h4bdtlzdcqaejtioujxp.png',
      'https://res.cloudinary.com/dyatlk8t7/image/upload/v1722522457/test/wtqogtmyrxvlf0i9g2kq.png',
      'https://res.cloudinary.com/dyatlk8t7/image/upload/v1722522458/test/doetcx5lyqofrzpzc9zu.png',
      'https://res.cloudinary.com/dyatlk8t7/image/upload/v1722522457/test/a3jwjrzjg8jyx9msfm54.jpg',
      'https://res.cloudinary.com/dyatlk8t7/image/upload/v1722522457/test/xafmoiw6dp8xc1bvw1ar.png',
    ]

    const descriptions = [
      'This NFT artwork features a mesmerizing blend of vibrant colors and dynamic geometric shapes. Each form intertwines with the next, creating a sense of movement and depth. The piece invites viewers to explore its intricate patterns and discover new perspectives within its abstract beauty',
      'Immerse yourself in a world where reality and fantasy merge. This NFT depicts a dreamlike landscape with ethereal creatures and floating islands. The soft pastel colors and whimsical elements evoke a sense of wonder and curiosity, challenging the boundaries of imagination.',
      'Dive into a futuristic metropolis illuminated by neon lights and towering skyscrapers. This NFT captures the essence of a bustling cyberpunk world, where technology and humanity coexist. The intricate details and vibrant colors create a captivating visual experience that transports viewers to a dystopian future.',
      'Experience the tranquility of a serene forest in this NFT artwork. Sunlight filters through lush green foliage, casting gentle shadows on the forest floor. The piece captures the delicate balance of nature, evoking a sense of peace and connection to the natural world.',
      'Embark on an interstellar journey with this NFT, depicting a celestial scene of galaxies and stars. The vibrant colors and swirling patterns convey the vastness and mystery of the universe. This artwork invites viewers to ponder the infinite possibilities beyond our world.',
      'Step into a surreal world where reality and imagination blend seamlessly. This NFT artwork showcases a whimsical landscape filled with vibrant colors and fantastical creatures. Each element tells a unique story, inviting viewers to embark on a journey of exploration and wonder.',
      'Unleash your inner creativity with this captivating NFT artwork. The intricate details and vibrant hues bring to life a mesmerizing composition that sparks the imagination. Dive into a world of endless possibilities and let your imagination soar.',
      'Immerse yourself in the beauty of nature with this stunning NFT artwork. From majestic mountains to tranquil lakes, each scene captures the essence of the natural world. The vibrant colors and meticulous details transport viewers to a place of serenity and awe.',
      'Experience the magic of the cosmos with this celestial-inspired NFT artwork. The swirling galaxies and shimmering stars create a sense of wonder and awe. Let your mind wander among the infinite possibilities of the universe.',
      'Transport yourself to a futuristic realm with this captivating NFT artwork. The sleek designs and vibrant colors depict a world where technology and imagination collide. Explore the possibilities of a world yet to come.',
    ]
    for (let i = 1; i <= 20; i++) {
      const image = [images[Math.floor(Math.random() * images.length)]]
      const product = {
        productName: `Product ${i}`,
        price: i * Math.floor(Math.random() * 10),
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        image: [JSON.stringify(image)],
        status: productStatus.ACTIVE,
        userId: 3,
      }

      products.push(product)
    }

    await Product.createMany(products)
  }
}
