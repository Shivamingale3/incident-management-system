import { type NextFunction, type Request, type Response } from 'express';
import { ZodError, type z } from 'zod';
import { HttpException } from '../exceptions/http.exception.js';

export const validationMiddleware = (schema: z.ZodType, source: 'body' | 'query' = 'body') => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.parseAsync(req[source]);
      if (source === 'body') {
        req.body = validatedData;
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.issues[0]?.message ?? 'Validation failed';
        next(new HttpException(400, message));
      } else {
        next(error);
      }
    }
  };
};
