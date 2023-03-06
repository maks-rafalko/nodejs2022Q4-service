import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { validateOrReject } from 'class-validator';
import { LoginDto } from '../user/dto/login.dto';

@Injectable()
export class AuthValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const login = new LoginDto();
    const errors = [];

    Object.keys(body).forEach((key) => {
      login[key] = body[key];
    });

    try {
      await validateOrReject(login);
    } catch (errs) {
      errs.forEach((err) => {
        Object.values(err.constraints).forEach((constraint) =>
          errors.push(constraint),
        );
      });
    }

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    next();
  }
}
