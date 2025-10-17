import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateAnalisisSueloDto } from './dto/create.analisis.dto';
@Injectable()
export class AnalisisSueloService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const suelos = await this.prisma.analisisSuelo.findMany({
      include: {
        suelo: true,
      },
    });

    if (!suelos || suelos.length === 0)
      throw new NotFoundException('No se encontraron suelos');

    return suelos;
  }

  async createAnalisis(dto: CreateAnalisisSueloDto) {
    const fechaDateTime = new Date(dto.fecha + 'T00:00:00.000Z');

    // Validar que la fecha es válida
    if (isNaN(fechaDateTime.getTime())) {
      throw new BadRequestException('La fecha proporcionada no es válida');
    }

    // Crear el análisis de suelo
    const analisis = await this.prisma.analisisSuelo.create({
      data: {
        fecha: fechaDateTime,
        laboratorio: dto.laboratorio,
        observaciones: dto.observaciones,
        sueloId: dto.sueloId,
      },
    });

    if (!analisis)
      throw new BadRequestException('No se pudo crear el analisis');

    return analisis;
  }
}
