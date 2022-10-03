import * as Joi from 'joi';
import IUser from '../interfaces';

const erroMsg = 'All fields must be filled&400';

const loginSchema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.base': erroMsg,
      'string.email': erroMsg,
      'any.required': erroMsg,
    }),
  password: Joi.string().required()
    .messages({
      'string.base': erroMsg,
      'any.required': erroMsg,
    }),
});

const validateLogin = (userObject: IUser): IUser => {
  const { error, value } = loginSchema.validate(userObject);
  console.error(error);

  if (error) {
    throw error;
  }

  return value;
};

export default validateLogin;
