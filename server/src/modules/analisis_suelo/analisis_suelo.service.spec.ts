import { Test, TestingModule } from '@nestjs/testing';
import { AnalisisSueloService } from './analisis_suelo.service';

describe('AnalisisSueloService', () => {
  let service: AnalisisSueloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalisisSueloService],
    }).compile();

    service = module.get<AnalisisSueloService>(AnalisisSueloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
