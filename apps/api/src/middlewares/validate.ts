import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { ValidationError } from './errors';

type SchemaMap = {
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
  cookies?: AnyZodObject;
  headers?: AnyZodObject;
};

export function validate(schemas: SchemaMap) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = await schemas.body.parseAsync(req.body);
      }
      if (schemas.query) {
        req.query = await schemas.query.parseAsync(req.query);
      }
      if (schemas.params) {
        req.params = await schemas.params.parseAsync(req.params);
      }
      if (schemas.cookies) {
        req.cookies = await schemas.cookies.parseAsync(req.cookies);
      }
      if (schemas.headers) {
        // headers are read-only in Express, so we attach validated version to req
        (req as any).validatedHeaders = await schemas.headers.parseAsync(req.headers);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const details: Record<string, string[]> = {};
        for (const issue of error.issues) {
          const path = issue.path.join('.');
          if (!details[path]) details[path] = [];
          details[path].push(issue.message);
        }
        throw new ValidationError('Dados de entrada inválidos', details);
      }
      next(error);
    }
  };
}