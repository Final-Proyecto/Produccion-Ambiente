import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
  IsString,
} from 'class-validator';
import { CreateCompanyDto } from 'src/modules/company/dto/create.company.dto';

export class RegisterAuthDto extends CreateCompanyDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  nombre: string;

  @IsNotEmpty({ message: 'El correo es obligatorio.' })
  @IsEmail({}, { message: 'Debe ingresar un correo electrónico válido.' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  @Matches(/[A-Z]/, {
    message: 'La contraseña debe contener al menos una letra mayúscula.',
  })
  @Matches(/\d/, {
    message: 'La contraseña debe contener al menos un número.',
  })
  password: string;
}
