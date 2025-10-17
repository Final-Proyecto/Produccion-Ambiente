import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}
  async createNotificationForRegister(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const admins = await this.prisma.user.findMany({
      where: { rol: 'admin' },
      select: { id: true, email: true },
    });

    const notification = await this.prisma.notification.create({
      data: {
        message: `Nuevo registro pendiente de validación: ${user.nombre}`,
        type: 'register_request',
        userId: user.id,
      },
    });

    return { admins, notification };
  }

  async registeredNotification() {}
  findAll() {
    return `This action returns all notifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
