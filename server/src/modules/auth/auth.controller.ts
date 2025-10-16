import {
  Controller,
  Post,
  Body,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register.auth.dto';
import { LoginAuthDto } from './dto/login.auth.dto';
import type { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //registrar
  @Post('register')
  register(@Body() dto: RegisterAuthDto) {
    return this.authService.register(dto);
  }

  //iniciar sesion
  @Post('login')
  async login(
    @Body() dto: LoginAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const result = await this.authService.login(dto);
      const token = await result.token;
      res.cookie('access_token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
      });
      return { message: 'Se ha iniciado sesión exitosamente' };
    } catch (error) {
      console.log('error en login');
      throw new HttpException(
        'Se produjo un error al iniciar sesión',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Cerrar sesión
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Se ha cerrado sesión exitosamente' };
  }
}
