import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.type';
import { UserService } from '../user/user.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();

    if (!req.body.refreshToken) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findByIdAndRefreshToken(payload.userId, refreshToken);

    if (!user || req.body.refreshToken !== refreshToken) {
      throw new ForbiddenException();
    }

    return { ...payload, refreshToken };
  }
}
