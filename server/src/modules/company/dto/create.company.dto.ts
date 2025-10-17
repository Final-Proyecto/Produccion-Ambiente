import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  nombreEmpresa: string;

  @IsNotEmpty({ message: 'La ubicación es obligatorio.' })
  ubicacion: string;

  @IsNotEmpty({ message: 'La superficie es obligatoria.' })
  superficie: string;

}
