import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateCultivoDto } from './dto/create.cultivo.dto';

@Injectable()
export class CultivosService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.cultivo.findMany();
  }

  async create(dto: CreateCultivoDto) {
    try {
      const loteExists = await this.prisma.lote.findUnique({
        where: { id: dto.loteId },
        include: { empresa: true },
      });

      if (!loteExists) {
        throw new NotFoundException(`El lote con ID ${dto.loteId} no existe`);
      }

      const fechaSiembra = new Date(dto.fechaSiembra);
      const fechaCosecha = dto.fechaCosecha ? new Date(dto.fechaCosecha) : null;

      if (fechaCosecha && fechaCosecha <= fechaSiembra) {
        throw new BadRequestException(
          'La fecha de cosecha debe ser posterior a la fecha de siembra',
        );
      }

      if (dto.superficie <= 0) {
        throw new BadRequestException('La superficie debe ser mayor a 0');
      }

      const cultivo = await this.prisma.cultivo.create({
        data: {
          nombre: dto.nombre,
          variedad: dto.variedad,
          superficie: dto.superficie,
          rendimiento: dto.rendimiento,
          loteId: dto.loteId,
          fechaSiembra: fechaSiembra,
          fechaCosecha: fechaCosecha,
        },
      });

      return {
        message: 'Cultivo creado exitosamente',
        data: cultivo,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      console.error('Error al crear cultivo:', error);
      throw new InternalServerErrorException('Error al crear el cultivo');
    }
  }

  async costosPorCultivo() {
    const cultivos = await this.prisma.cultivo.findMany({
      include: {
        cultivoCosto: true,
      },
    });

    if (!cultivos || cultivos.length === 0) {
      throw new NotFoundException('No se encontraron cultivos');
    }

    const resultado = cultivos.map((cultivo) => {
      if (!cultivo.cultivoCosto || !Array.isArray(cultivo.cultivoCosto)) {
        return {
          id: cultivo.id,
          nombre: cultivo.nombre,
          totalCosto: 0,
          mensaje: 'No hay datos de costos para este cultivo',
        };
      }

      const totalCosto = cultivo.cultivoCosto.reduce((sum, costo) => {
        const cantidad = costo.cantidadAplicada
          ? parseFloat(costo.cantidadAplicada.toString())
          : 1;
        const costoUnitario = costo.costoPorUnidad
          ? parseFloat(costo.costoPorUnidad.toString())
          : 0;

        if (isNaN(cantidad) || isNaN(costoUnitario)) {
          console.warn(`Datos inválidos en costos para cultivo ${cultivo.id}`);
          return sum;
        }

        const subtotal = cantidad * costoUnitario;
        return sum + subtotal;
      }, 0);

      return {
        id: cultivo.id,
        cultivo: cultivo.nombre,
        totalCosto: totalCosto,
      };
    });

    return resultado;
  }

  async gastosPorTipo() {
    const gastos = await this.prisma.cultivoCosto.groupBy({
      by: ['tipoCosto'],
      _sum: {
        costoPorUnidad: true,
      },
    });

    if (!gastos || gastos.length === 0) {
      throw new NotFoundException('No se encontraron datos de costos');
    }

    return gastos.map((g) => ({
      tipoCosto: g.tipoCosto,
      totalGasto: Number(g._sum.costoPorUnidad) || 0,
    }));
  }
}
