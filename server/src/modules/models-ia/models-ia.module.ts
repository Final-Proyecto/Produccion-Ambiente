import { Module } from '@nestjs/common';
import { ModelsIaService } from './models-ia.service';
import { ModelsIaController } from './models-ia.controller';

@Module({
  controllers: [ModelsIaController],
  providers: [ModelsIaService],
})
export class ModelsIaModule {}
