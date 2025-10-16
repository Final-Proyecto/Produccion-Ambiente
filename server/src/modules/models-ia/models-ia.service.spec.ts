import { Test, TestingModule } from '@nestjs/testing';
import { ModelsIaService } from './models-ia.service';

describe('ModelsIaService', () => {
  let service: ModelsIaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModelsIaService],
    }).compile();

    service = module.get<ModelsIaService>(ModelsIaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
