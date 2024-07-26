import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  public async handle(error: unknown, ctx: HttpContext) {
    const status = (error as any)?.status || 500
    const message = (error as any)?.messages || (error as any)?.message || 'Internal Server Error'
    console.log(message)
    // logger.error(`Status: ${status}, Message: ${message}`)

    return ctx.response.status(status).send({
      status_code: status,
      errors: typeof message === 'string' ? [{ message }] : message,
    })
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
