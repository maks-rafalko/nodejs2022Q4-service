import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<Omit<User, 'password'> | null> {
    console.log(`AuthService.validateUser(); username=${username}; pass=${pass}`);
    const user = await this.usersService.findOneByLogin(username);

    console.log(`AuthService.validateUser(); found user=`, user);

    // todo use bcrypt here
    if (user && user.password === pass) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: Omit<User, 'password'>) {
    console.log('AuthService.login(). user=', user);
    console.log('JWT_SECRET=', process.env.JWT_SECRET);
    const payload = { login: user.login, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
