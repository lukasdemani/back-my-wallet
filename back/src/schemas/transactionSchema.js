import joi from 'joi';

const transactionSchema = joi.object ({
  amount: joi.number().greater(0).required(),
  description: joi.string(),
  type: joi.string().valid('in', 'out'),
});


export default transactionSchema;