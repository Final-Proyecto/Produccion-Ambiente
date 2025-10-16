import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
  IsString,
  MaxLength,
  IsEnum,
} from 'class-validator';

export class RegisterAuthDto {
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
