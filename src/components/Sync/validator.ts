import Joi from 'joi'

const activitySchema = Joi.object().pattern(
	Joi.string().isoDate(),
	Joi.number().integer().min(0)
)

const itemSchema = Joi.object({
	name: Joi.string().required(),
	count: Joi.number().integer().min(0).required(),
	meta: Joi.object({
		creation_date: Joi.string().isoDate().required(),
		last_update: Joi.string().isoDate().required(),
		activity: activitySchema.required(),
	}).required(),
})

export const schema = Joi.object({
	state: Joi.object({
		list: Joi.array().items(itemSchema).required(),
	}).required(),
	version: Joi.number().integer().min(0).required(),
})
