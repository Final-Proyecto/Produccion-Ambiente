import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCultivoDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  nombre: string;
  @IsString()
  @IsOptional()
  variedad: string;
  @IsNumber()
  @IsNotEmpty({ message: 'La superficie es obligatoria.' })
  superficie: number;
  @IsNumber()
  rendimiento: number;
  @IsNumber()
  @IsNotEmpty({ message: 'El lote es obligatorio.' })
  loteId: number;
  @IsString()
  @IsNotEmpty({ message: 'La fecha de siembra es obligatoria.' })
  fechaSiembra: string;
  @IsString()
  @IsOptional()
  fechaCosecha: string;
}
