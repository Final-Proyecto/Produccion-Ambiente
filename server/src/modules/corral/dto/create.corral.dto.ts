import { IsEnum, IsNumber, IsString } from 'class-validator';
import { TipoCorral } from '../../../../generated/prisma/client';

export class CreateCorralDto {
  @IsString()
  nombre: string;
  @IsNumber()
  capacidad: number;
  @IsNumber()
  empresaId: number;
  @IsEnum(TipoCorral)
  tipo: TipoCorral;
}
