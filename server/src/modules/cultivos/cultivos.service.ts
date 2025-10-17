import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class CultivosService {
  constructor(private prisma: PrismaService) {}

async costosPorCultivo() {
    try {
      const cultivos = await this.prisma.cultivoCosto.groupBy({
        by: ['tipoCosto'],
        _sum: {
          costoPorUnidad: true,
        },
      });

      if (!cultivos || cultivos.length === 0) {
        throw new NotFoundException('No se encontraron cultivos');
      }

      const resultado = cultivos.map((cultivo) => {
        // Verificar que cultivoCosto existe y es un array
        if (!cultivo || !Array.isArray(cultivo)) {
          return {
            id: cultivo,
            cultivo: cultivo,
            totalCosto: 0,
            mensaje: 'No hay datos de costos para este cultivo',
          };
        }

        const totalCosto = cultivo.reduce((sum, costo) => {
          // Validar que los datos existen y son números válidos
          const cantidad = costo.cantidadAplicada
            ? parseFloat(costo.cantidadAplicada.toString())
            : 1;
          const costoUnitario = costo.costoPorUnidad
            ? parseFloat(costo.costoPorUnidad.toString())
            : 0;

          // Validar que son números válidos
          if (isNaN(cantidad) || isNaN(costoUnitario)) {
            console.warn(`Datos inválidos en costos para cultivo ${cultivo}`);
            return sum;
          }

          const subtotal = cantidad * costoUnitario;
          return sum + subtotal;
        }, 0);

        return {
          totalCosto,
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
