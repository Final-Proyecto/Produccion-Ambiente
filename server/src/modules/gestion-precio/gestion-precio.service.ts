import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class GestionPrecioService {
  constructor(private prisma: PrismaService) {}

  async resumenGastosDashboard() {
    const [agricola, ganadero] = await Promise.all([
      // Sector agrícola
      this.prisma.cultivoCosto.aggregate({
        _sum: {
          costoPorUnidad: true,
        },
        _count: {
          id: true,
        },
      }),

      // Sector ganadero
      this.prisma.animalCosto.aggregate({
        _sum: {
          costoPorUnidad: true,
        },
        _count: {
          id: true,
        },
      }),
    ]);

    const totalAgricola = Number(agricola._sum.costoPorUnidad || 0);
    const totalGanadero = Number(ganadero._sum.costoPorUnidad || 0);
    const totalGeneral = totalAgricola + totalGanadero;

    return {
      totales: {
        agricola: totalAgricola,
        ganadero: totalGanadero,
        general: totalGeneral,
      },
      porcentajes: {
        agricola:
          totalGeneral > 0
            ? Number(((totalAgricola / totalGeneral) * 100).toFixed(1))
            : 0,
        ganadero:
          totalGeneral > 0
            ? Number(((totalGanadero / totalGeneral) * 100).toFixed(1))
            : 0,
      },
      cantidadRegistros: {
        agricola: agricola._count.id,
        ganadero: ganadero._count.id,
      },
    };
  }
}
