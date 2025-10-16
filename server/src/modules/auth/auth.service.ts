import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomJwtService } from 'src/common/helpers/jwt.services';
import { RegisterAuthDto } from './dto/register.auth.dto';
import { LoginAuthDto } from './dto/login.auth.dto';
import { BcryptHelper } from 'src/common/helpers/bcrypt.services';
import { IPayload } from 'src/common/interface/jwt.interface';
import { PrismaService } from 'src/common/prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: CustomJwtService,
    private bcryptH: BcryptHelper,
    private prisma: PrismaService,
  ) {}

  async register(dto: RegisterAuthDto) {
    const existUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existUser) {
      console.log('Existe usuario');
      throw new UnauthorizedException(
        'La dirección de correo electrónica ya se encuentra registrada.',
      );
    }

    const hashedPassword = await this.bcryptH.hashPassword(dto.password);

    await this.prisma.user.create({
      data: {
        nombre: dto.nombre,
        email: dto.email,
        password: hashedPassword,
        isActive: false,
      },
    });

    return {
      message: 'Usuario creado exitosamente.',
    };
  }

  async login(dto: LoginAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException([
        'email: El correo electrónico no está registrado en nuestro sistema',
      ]);
    }

    const isPasswordValid = await this.bcryptH.comparePassword(
      dto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException([
        'password: La contraseña es incorrecta',
      ]);
    }

    const payload: IPayload = {
      sub: user.id,
    };

    const token = this.jwtService.createToken(payload);

    return { token };
  }
}
