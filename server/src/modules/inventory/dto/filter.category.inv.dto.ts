import { IsEnum, IsNotEmpty } from 'class-validator';
import { CategoriaInventario } from '../../../../generated/prisma/client';

export class FilterCategoryInvDto {
  @IsEnum(CategoriaInventario)
  @IsNotEmpty({ message: 'La categoría es obligatoria.' })
  categoria: CategoriaInventario;
}
