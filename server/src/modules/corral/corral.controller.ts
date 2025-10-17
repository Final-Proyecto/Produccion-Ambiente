import { Controller, Get } from '@nestjs/common';
import { CorralService } from './corral.service';

@Controller('corral')
export class CorralController {
  constructor(private readonly corralService: CorralService) {}

  @Get('gastos-por-corral')
  async gastosPorCorral() {
    return await this.corralService.gastosPorCorral();
  }
}
