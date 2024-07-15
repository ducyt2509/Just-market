import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'

import ProductsController from '#controllers/products_controller'
import { UsersController } from '#controllers/users_controller'
import { middleware } from './kernel.js'

router
  .group(() => {
    router.post('register', [AuthController, 'register'])
    router.post('login', [AuthController, 'login'])
  })
  .prefix('/auth')

router
  .group(() => {
    //USER API
    router
      .group(() => {
        // router.get('/', [UsersController, 'index'])
        // router.get('/:id', [UsersController, 'show'])
        // router.post('/', [UsersController, 'store'])
        router.patch('/:id', [UsersController, 'update'])
        // router.delete('/:id', [UsersController, 'destroy'])
      })
      .prefix('/users')
    //USER API

    //PRODUCT API
    router
      .group(() => {
        router.post('/', [ProductsController, 'create'])
        router.patch('/:id', [ProductsController, 'update'])
      })
      .prefix('/products')
    //PRODUCT API

      // OFFER API
      router.group(() => {})
  })
  .use(middleware.auth({ guards: ['api'] }))
