import { HttpContext } from '@adonisjs/core/http'

export default class CustomException {
  private message: string
  private status: number

  constructor(message: string, status: number) {
    this.message = message
    this.status = status
  }

  /**
   * Handle this exception by itself
   */
  public async handle(error: this, { response }: HttpContext) {
    response.status(error.status).send({
      status_code: error.status,
      errors: [
        {
          message: error.message,
        },
      ],
    })
  }
}
