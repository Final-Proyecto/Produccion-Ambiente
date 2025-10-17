import { Module } from '@nestjs/common';
import { AnalisisSueloService } from './analisis_suelo.service';
import { AnalisisSueloController } from './analisis_suelo.controller';

@Module({
  controllers: [AnalisisSueloController],
  providers: [AnalisisSueloService],
})
export class AnalisisSueloModule {}
