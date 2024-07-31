import Joi from "joi";

export const memberSchema = Joi.object({

    firstname: Joi.string(),
    lastname: Joi.string(),
    dateOfBirth: Joi.string(),
    sex: Joi.string(),
    contactInfo: Joi.string(),
    startDate: Joi.date(),
    emergencyName: Joi.string(),
    emergencyContact: Joi.string(),
    image: Joi.string()

})

