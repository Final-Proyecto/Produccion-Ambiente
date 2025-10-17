import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateAnalisisSueloDto {
  @IsString()
  fecha: string;
  @IsString()
  laboratorio: string;
  @IsString()
  observaciones: string;
  @IsNumber()
  sueloId: number;
}
