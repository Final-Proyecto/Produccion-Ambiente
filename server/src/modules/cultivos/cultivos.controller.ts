import { Controller, Get } from '@nestjs/common';
import { CultivosService } from './cultivos.service';

@Controller('cultivos')
export class CultivosController {
  constructor(private readonly cultivosService: CultivosService) {}

  @Get('costo-cultivos')
  async cultivosCosto() {
    return this.cultivosService.costosPorCultivo();
  }

  @Get('gastos-por-tipo')
  async gastosPorTipo() {
    return this.cultivosService.gastosPorTipo();
  }
}
