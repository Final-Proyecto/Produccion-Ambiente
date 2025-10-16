import { IsString, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { CategoriaInventario } from '../../../../generated/prisma/client';

export class CreateInventoryDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  nombre: string;

  @IsEnum(CategoriaInventario)
  categoria: CategoriaInventario; //insumos, maquinas, herramientas

  @IsNumber()
  @IsNotEmpty({ message: 'Ingrese la cantidad.' })
  cantidad: number;

  @IsString()
  @IsNotEmpty({ message: 'Ingrese la unidad de medida.' })
  unidad_medida: string;

  @IsString()
  @IsNotEmpty({ message: 'Ingrese el almacen en el que se encuentra.' })
  almacen: string;
}
