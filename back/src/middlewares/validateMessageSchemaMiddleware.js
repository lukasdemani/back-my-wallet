import messageSchema from "../schemas/messageSchema.js";

export default function validateSchemaMiddleware(req, res, next) {
  const validation = messageSchema.validate(req.body);

  if (validation.error) {
    return res.sendStatus(422);
  }

  next();
}