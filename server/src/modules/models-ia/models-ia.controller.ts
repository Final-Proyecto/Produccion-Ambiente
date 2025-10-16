import { Controller } from '@nestjs/common';
import { ModelsIaService } from './models-ia.service';

@Controller('models-ia')
export class ModelsIaController {
  constructor(private readonly modelsIaService: ModelsIaService) {}
}
