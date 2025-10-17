import { Injectable } from '@nestjs/common';
import { CreateSueloDto } from './dto/create-suelo.dto';
import { UpdateSueloDto } from './dto/update-suelo.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class SueloService {
  constructor(private prisma: PrismaService) {}
  create(createSueloDto: CreateSueloDto) {
    return 'This action adds a new suelo';
  }

  async findAll() {
    const suelos = await this.prisma.analisisSuelo.findMany({
      include: {
        suelo: true,
      },
    });

    if (!suelos || suelos.length === 0)
      throw new NotFoundException('No se encontraron suelos');
  }

  findOne(id: number) {
    return `This action returns a #${id} suelo`;
  }

  update(id: number, updateSueloDto: UpdateSueloDto) {
    return `This action updates a #${id} suelo`;
  }

  remove(id: number) {
    return `This action removes a #${id} suelo`;
  }
}
