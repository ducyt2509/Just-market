import vine from '@vinejs/vine'

export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(3).maxLength(255).optional(),
    email: vine.string().email().optional(),
    password: vine.string().minLength(6).maxLength(32).optional(),
  })
)
