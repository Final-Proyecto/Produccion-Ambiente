import { Test, TestingModule } from '@nestjs/testing';
import { AnalisisSueloController } from './analisis_suelo.controller';
import { AnalisisSueloService } from './analisis_suelo.service';

describe('AnalisisSueloController', () => {
  let controller: AnalisisSueloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalisisSueloController],
      providers: [AnalisisSueloService],
    }).compile();

    controller = module.get<AnalisisSueloController>(AnalisisSueloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
