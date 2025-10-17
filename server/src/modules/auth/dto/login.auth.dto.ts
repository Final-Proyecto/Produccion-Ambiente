import { RegisterAuthDto } from './register.auth.dto';
import { OmitType } from '@nestjs/mapped-types';

export class LoginAuthDto extends OmitType(RegisterAuthDto, [
  'nombre',
  'nombreEmpresa',
  'superficie',
  'ubicacion',
]) {}
