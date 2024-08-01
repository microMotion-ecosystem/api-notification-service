import { Test, TestingModule } from '@nestjs/testing';
import { MesgatController } from './mesgat.controller';

describe('MesgatController', () => {
  let controller: MesgatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MesgatController],
    }).compile();

    controller = module.get<MesgatController>(MesgatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
