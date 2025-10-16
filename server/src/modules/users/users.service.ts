import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async getUserId(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      select: {
        nombre: true,
        email: true,
        rol: true,
        isActive: true,
      },
    });

    if (!user) return new NotFoundException('El usuario que buscas no existe');

    return user;
  }

  async validarTrabajador(id: number) {}
}
