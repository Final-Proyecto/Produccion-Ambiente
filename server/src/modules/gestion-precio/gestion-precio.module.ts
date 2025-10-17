import { Module } from '@nestjs/common';
import { GestionPrecioService } from './gestion-precio.service';
import { GestionPrecioController } from './gestion-precio.controller';

@Module({
  controllers: [GestionPrecioController],
  providers: [GestionPrecioService],
})
export class GestionPrecioModule {}
