import { Controller, Get, Post, Body } from '@nestjs/common';
import { CultivosService } from './cultivos.service';
import { CreateCultivoDto } from './dto/create.cultivo.dto';
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

  @Post('create')
  async create(@Body() dto: CreateCultivoDto) {
    return this.cultivosService.create(dto);
  }
}
