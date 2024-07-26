import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'

import ProductsController from '#controllers/products_controller'
import { UsersController } from '#controllers/users_controller'
import { middleware } from './kernel.js'
import OffersController from '#controllers/offers_controller'

router
  .group(() => {
    router.post('register', [AuthController, 'register'])
    router.post('login', [AuthController, 'login'])
  })
  .prefix('/auth')

//  .use(middleware.isOwnerDynamic(['products', 'user_id']))
router
  .group(() => {
    router
      .group(() => {
        router.get('/aboutme', [UsersController, 'aboutMe'])
        // router.get('/:id', [UsersController, 'show'])
        // router.post('/', [UsersController, 'store'])
        router.patch('/:id', [UsersController, 'update'])
        // router.delete('/:id', [UsersController, 'destroy'])
      })
      .prefix('/users')

    router
      .group(() => {
        router.post('/', [ProductsController, 'create'])
        router.get('/', [ProductsController, 'findManyWithPagination']).use(middleware.paginate())
        router.get('/:id', [ProductsController, 'findOneById'])
        router
          .put('/:id', [ProductsController, 'update'])
          .use(middleware.isOwnerDynamic(['products', 'user_id']))
        router
          .delete('/:id', [ProductsController, 'delete'])
          .use(middleware.isOwnerDynamic(['products', 'user_id']))
      })
      .prefix('/products')

    router
      .group(() => {
        router.get('/', [OffersController, 'findManyWithPagination']).use(middleware.paginate())
        router.get('/:id', [OffersController, 'findOneById'])
        router.post('/:id', [OffersController, 'create'])
        router
          .put('/:id', [OffersController, 'update'])
          .use(middleware.isOwnerDynamic(['offers', 'owner_id']))
      })
      .prefix('/offers')
  })
  .use(middleware.auth({ guards: ['api'] }))
