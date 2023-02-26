import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    rawPassword: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOneByLogin(username);

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
    const payload = {
      login: user.login,
      userId: user.id,
      sub: user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
