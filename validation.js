const Joi=require('@hapi/joi')

module.exports.registerValidation=(data)=>{
    const validationSchema= Joi.object({
        username:Joi.string().min(6).required(),
        name:Joi.string().min(6).required(),
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required(),

    });
     return validationSchema.validate(data)
    }
    module.exports.loginValidation=(data)=>{
        const validationSchema= Joi.object({
            email:Joi.string().min(6).required().email(),
            password:Joi.string().min(6).required(),
        });
         return validationSchema.validate(data)
        }