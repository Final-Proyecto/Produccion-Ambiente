import { RegisterAuthDto } from './register.auth.dto';
import { OmitType } from '@nestjs/mapped-types';

<<<<<<< HEAD
export class LoginAuthDto extends OmitType(RegisterAuthDto, ['nombre','nombreEmpresa','superficie','ubicacion']) {}
=======
export class LoginAuthDto extends OmitType(RegisterAuthDto, [
  'nombre',
  'nombreEmpresa',
  'superficie',
  'ubicacion',
]) {}
>>>>>>> acb19c8b92a83c3f2e7dd27c722ece13102cfc31
