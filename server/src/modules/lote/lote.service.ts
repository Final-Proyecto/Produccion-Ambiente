import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoteDto } from './dto/create-lote.dto';
import { UpdateLoteDto } from './dto/update-lote.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
@Injectable()
export class LoteService {
  constructor(private prisma: PrismaService) {}
  create(createLDto: CreateLoteDto) {
    return this.prisma.lote.create({ data: { ...createLDto, empresaId: 1 } });
  }

  findAll() {
    return this.prisma.lote.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} lote`;
  }

  update(id: number, updateLoteDto: UpdateLoteDto) {
    const lote = this.prisma.lote.findUnique({ where: { id } });

    if (!lote) throw new NotFoundException('Lote no encontrado');

    return this.prisma.lote.update({ where: { id }, data: updateLoteDto });
  }

  remove(id: number) {
    return `This action removes a #${id} lote`;
  }
}
