import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateCorralDto } from './dto/create.corral.dto'; // Ajusta la ruta según tu estructura

@Injectable()
export class CorralService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllByEmpresa(empresaId: number) {
    const res = await this.prisma.corral.findMany({
      where: {
        empresaId,
      },
    });

    if (!res) throw new NotFoundException('No se encontraron corrales');

    return res;
  }
  async createCorral(dto: CreateCorralDto) {
    try {
      // Verificar si la empresa existe
      const empresaExists = await this.prisma.empresa.findUnique({
        where: { id: dto.empresaId },
      });

      if (!empresaExists) {
        throw new NotFoundException(
          `La empresa con ID ${dto.empresaId} no existe`,
        );
      }

      const corralExistente = await this.prisma.corral.findFirst({
        where: {
          nombre: dto.nombre,
          empresaId: dto.empresaId,
        },
      });

      if (corralExistente) {
        throw new ConflictException(
          'Ya existe registrado un corral con ese nombre',
        );
      }
      if (dto.capacidad <= 0) {
        throw new ConflictException(
          'La capacidad del corral debe ser mayor a 0',
        );
      }

      const corral = await this.prisma.corral.create({
        data: {
          nombre: dto.nombre,
          capacidad: dto.capacidad,
          empresaId: dto.empresaId,
          tipo: dto.tipo,
        },
        include: {
          empresa: {
            select: {
              id: true,
              nombre: true,
            },
          },
          animales: true,
        },
      });

      return {
        message: 'Corral creado exitosamente',
        data: corral,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }

      console.error('Error al crear corral:', error);
      throw new ConflictException('Error al crear el corral');
    }
  }

  async gastosPorCorral() {
    try {
      const corrales = await this.prisma.corral.findMany({
        include: {
          animales: {
            include: {
              animalCosto: true,
            },
          },
        },
      });

      if (!corrales || corrales.length === 0) {
        throw new NotFoundException('No se encontraron corrales');
      }

      const resultado = corrales.map((corral) => {
        // Calcular gastos de todos los animales del corral
        const gastoTotal = corral.animales.reduce((totalCorral, animal) => {
          const gastoAnimal = (animal.animalCosto || []).reduce(
            (totalAnimal, costo) => {
              // Calcular subtotal del costo
              const cantidad = costo.cantidadAplicada
                ? Number(costo.cantidadAplicada)
                : 1;
              const costoUnitario = costo.costoPorUnidad
                ? Number(costo.costoPorUnidad)
                : 0;

              if (isNaN(cantidad) || isNaN(costoUnitario)) {
                console.warn(
                  `Datos inválidos en costos para animal ${animal.id}`,
                );
                return totalAnimal;
              }

              return totalAnimal + cantidad * costoUnitario;
            },
            0,
          );

          return totalCorral + gastoAnimal;
        }, 0);

        // Calcular métricas adicionales
        const cantidadAnimales = corral.animales.length;
        const gastoPromedioPorAnimal =
          cantidadAnimales > 0 ? gastoTotal / cantidadAnimales : 0;

        return {
          id: corral.id,
          corral: corral.nombre,
          tipo: corral.tipo,
          capacidad: corral.capacidad,
          cantidadAnimales: cantidadAnimales,
          ocupacion: Number(
            ((cantidadAnimales / corral.capacidad) * 100).toFixed(2),
          ),
          gastoTotal: Number(gastoTotal.toFixed(2)),
          gastoPromedioPorAnimal: Number(gastoPromedioPorAnimal.toFixed(2)),
          capacidadUtilizada: `${cantidadAnimales}/${corral.capacidad}`,
        };
      });

      return resultado;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error en gastosPorCorral:', error);
      throw new InternalServerErrorException(
        'Error al calcular los gastos por corral',
      );
    }
  }
}
