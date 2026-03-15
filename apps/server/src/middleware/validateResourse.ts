import type { NextFunction, Request, Response } from "express";
import type { ZodObject } from "zod";

import logger from "../utils/logger.js";

// Currying allows to execute function with schema inside of middleware and then
// we will return another function which will take req, res and next and validate req against the schema
const validate = (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error: any) {
    logger.error(error);
    return res.status(400).send(error.message);
  }
};

export default validate;
