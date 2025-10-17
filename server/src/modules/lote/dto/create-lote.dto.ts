import { IsString, IsNumber } from 'class-validator';

export class CreateLoteDto {
  @IsString()
  nombre: string;
  @IsString()
  superficie: number;
  @IsString()
  ubicacion: string;
}
