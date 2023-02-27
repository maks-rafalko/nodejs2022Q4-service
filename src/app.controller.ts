import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { CreateUserDto } from './user/dto/create-user.dto';
import { User } from './user/entities/user.entity';
import { UserService } from './user/user.service';
import { Public } from './auth/is-public.decorator';
import { LoginDto } from './user/dto/login.dto';
import { StatusCodes } from 'http-status-codes';
import { RefreshTokenGuard } from './auth/refresh-jwt-auth.guard';
import { JwtPayload } from './auth/jwt-payload.type';
import { AppLogger } from './logger/logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly logger: AppLogger,
  ) {}

  @Public()
  @Get()
  async root() {
    return { message: 'Hello, world!' };
  }

  @Public()
  @Post('auth/signup')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @HttpCode(StatusCodes.OK)
  async login(@Body() loginDto: LoginDto, @Request() req) {
    return await this.authService.login(req.user);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('auth/refresh')
  @HttpCode(StatusCodes.OK)
  async refresh(@Request() req) {
    const user: JwtPayload & { refreshToken: string } = req.user;

    return await this.authService.refreshTokens(user, user.refreshToken);
  }

  @Get('auth/restricted')
  async restricted() {
    return {
      message: 'finally, you can see restricted area! Congratulations.',
    };
  }

  @Public()
  @Get('check-logger')
  async checkLogger() {
    this.logger.error('Logger error');
    this.logger.warn('Logger warn');
    this.logger.log('Logger log');
    this.logger.verbose('Logger verbose');
    this.logger.debug('Logger debug');

    return {
      message: 'Check the logs - all levels should have been logged if according to LOG_LEVEL.',
    };
  }

  @Public()
  @Get('check-error')
  async checkError() {
    throw new Error('This is a test error');
  }
}
