import { Injectable, NotFoundException,InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class CultivosService {
  constructor(private prisma: PrismaService) {}

async costosPorCultivo() {
    try {
      // Paso 1: Obtener los IDs de los cultivos con nombres distintos, limitado a 30
      const cultivosDistinct = await this.prisma.cultivo.findMany({
        select: {
          id: true,
        },
        distinct: ['nombre'],
        take: 30,
        orderBy: {
          nombre: 'asc',
        },
      });

      const ids = cultivosDistinct.map((c) => c.id);

      // Paso 2: Obtener los cultivos completos con esos IDs, incluyendo costos
      const cultivos = await this.prisma.cultivo.findMany({
        where: {
          id: { in: ids },
        },
        include: {
          cultivoCosto: true,
        },
      });

      if (!cultivos || cultivos.length === 0) {
        throw new NotFoundException('No se encontraron cultivos');
      }

      const resultado = cultivos.map((cultivo) => {
        const totalCosto = (cultivo.cultivoCosto || []).reduce(
          (sum, costo) => sum + Number(costo.cantidadAplicada) * Number(costo.costoPorUnidad),
          0,
        );

        return {
          id: cultivo.id,
          cultivo: cultivo.nombre,
          variedad: cultivo.variedad,
          superficie: cultivo.superficie,
          rendimiento: cultivo.rendimiento,
          totalCosto: Number(totalCosto.toFixed(2)),
          costoPorHectarea:
            cultivo.superficie > 0
              ? Number((totalCosto / cultivo.superficie).toFixed(2))
              : 0,
          cantidadCostos: cultivo.cultivoCosto?.length || 0,
        };
      });

      return resultado;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error en costosPorCultivo:', error);
      throw new InternalServerErrorException(
        'Error al calcular los costos por cultivo',
      );
    }
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

