import { IsString, IsNumber } from 'class-validator';
import { CreateInventoryDto } from './create-inventory.dto';

export class UpdateInventoryDto {
  @IsString()
  nombre: string;

  @IsNumber()
  cantidad: number;

  @IsString()
  unidad_medida: string;

  @IsString()
  almacen: string;
}
