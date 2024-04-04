import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class DynamicDbSwitcherMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Retrieve the 'x-db-name' header which determines the database name
    const dbName = req.headers['x-db-name'] as string;

    // Ensure the dbName is provided; if not, throw an error
    if (!dbName) {
      throw new BadRequestException({
        message: 'Database name is not provided in the header',
      });
    }

    // Store the dbName in the request object for downstream use
    req['dbName'] = dbName;

    // Proceed to the next middleware
    next();
  }
}
