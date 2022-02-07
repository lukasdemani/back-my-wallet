import joi from 'joi';

const transactionSchema = joi.object ({
  amount: joi.number().required(),
  description: joi.string(),
  type: joi.string().valid('in', 'out'),
});


export default transactionSchema;