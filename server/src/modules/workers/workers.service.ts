import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class WorkersService {
  constructor(private prisma: PrismaService) {}
  async validateWorker(email: string) {
    try {
      await this.prisma.user.update({
        where: { email: email },
        data: {
          isActive: true,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Se produjo un error al iniciar sesión',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return `This action returns all workers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} worker`;
  }

  remove(id: number) {
    return `This action removes a #${id} worker`;
  }
}
