import { Controller, Get, Post, Body } from '@nestjs/common';
import { CorralService } from './corral.service';
import { CreateCorralDto } from './dto/create.corral.dto';
@Controller('corral')
export class CorralController {
  constructor(private readonly corralService: CorralService) {}

  @Get('all')
  async getAllCorralesByEmpresa(empresaId: number) {
    return await this.corralService.getAllByEmpresa(empresaId);
  }

  @Get('gastos-por-corral')
  async gastosPorCorral() {
    return await this.corralService.gastosPorCorral();
  }

  @Post('create-corral')
  async createCorral(@Body() dto: CreateCorralDto) {
    return await this.corralService.createCorral(dto);
  }
}
