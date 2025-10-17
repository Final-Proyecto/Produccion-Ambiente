import { Module } from '@nestjs/common';
import { SueloService } from './suelo.service';
import { SueloController } from './suelo.controller';

@Module({
  controllers: [SueloController],
  providers: [SueloService],
})
export class SueloModule {}
