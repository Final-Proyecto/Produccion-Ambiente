import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class CultivosService {
  constructor(private prisma: PrismaService) {}

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
      const totalCosto = cultivo.cultivoCosto.reduce((sum, costo) => {
        const subtotal = costo.cantidadAplicada
          ? Number(costo.cantidadAplicada) * Number(costo.costoPorUnidad)
          : Number(costo.costoPorUnidad);
        return sum + subtotal;
      }, 0);

      return {
        cultivo: cultivo.nombre,
        totalCosto,
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
