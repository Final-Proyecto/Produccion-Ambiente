import { Test, TestingModule } from '@nestjs/testing';
import { ModelsIaController } from './models-ia.controller';
import { ModelsIaService } from './models-ia.service';

describe('ModelsIaController', () => {
  let controller: ModelsIaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModelsIaController],
      providers: [ModelsIaService],
    }).compile();

    controller = module.get<ModelsIaController>(ModelsIaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
