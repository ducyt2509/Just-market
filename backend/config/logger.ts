import env from '#start/env'
import app from '@adonisjs/core/services/app'
import { defineConfig, targets } from '@adonisjs/core/logger'

const loggerConfig = defineConfig({
  default: 'app',

  loggers: {
    app: {
      enabled: true,
      name: env.get('APP_NAME'),
      level: env.get('LOG_LEVEL', 'info'), // Provide a default log level if not set in env
      transport: {
        targets: targets()
          .pushIf(
            !app.inProduction,
            targets.pretty({ destination: 1 }) // Ensure 'pino-pretty' is used correctly
          )
          .pushIf(
            app.inProduction,
            targets.file({ destination: 'app.log' }) // Ensure the file path is correct
          )
          .toArray(),
      },
    },
  },
})

export default loggerConfig

declare module '@adonisjs/core/types' {
  export interface LoggersList extends InferLoggers<typeof loggerConfig> {}
}
