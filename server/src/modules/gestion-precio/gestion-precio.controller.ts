import { Controller, Get } from '@nestjs/common';
import { GestionPrecioService } from './gestion-precio.service';

@Controller('gestion-precio')
export class GestionPrecioController {
  constructor(private readonly gestionPrecioService: GestionPrecioService) {}

  @Get('resumen-gastos')
  async resumenGastosDashboard() {
    return await this.gestionPrecioService.resumenGastosDashboard();
  }
}
