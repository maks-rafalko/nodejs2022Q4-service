import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { compare } from 'bcrypt';
import { JwtPayload } from './jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    rawPassword: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findOneByLogin(username);

    if (user === null) {
      return null;
    }

    const passwordsMatch = await compare(rawPassword, user.password);

    if (passwordsMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: Omit<User, 'password'>) {
    const tokens = this.generateTokens(user.login, user.id);

    await this.userService.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async refreshTokens(payload: JwtPayload) {
    const tokens = this.generateTokens(payload.login, payload.userId);

    await this.userService.updateRefreshToken(
      payload.userId,
      tokens.refreshToken,
    );

    return tokens;
  }

  private generateTokens(login: string, userId: string) {
    const payload = {
      login: login,
      userId: userId,
      sub: userId,
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '60d',
      }),
    };
  }
}
