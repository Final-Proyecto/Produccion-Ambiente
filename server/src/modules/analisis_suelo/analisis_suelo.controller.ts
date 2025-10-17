import { Controller } from '@nestjs/common';
import { AnalisisSueloService } from './analisis_suelo.service';

@Controller('analisis-suelo')
export class AnalisisSueloController {
  constructor(private readonly analisisSueloService: AnalisisSueloService) {}
}
