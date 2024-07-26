import vine from '@vinejs/vine'

export const CreateOfferValidator = vine.compile(
  vine.object({
    amount: vine.number(),
  })
)
