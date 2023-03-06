import { Injectable, NestMiddleware } from '@nestjs/common';
import { AppLogger } from './logger.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: AppLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      `Request: ${req.method} ${req.originalUrl}; Body ${JSON.stringify(
        req.body,
      )}`,
    );

    next();
  }
}
