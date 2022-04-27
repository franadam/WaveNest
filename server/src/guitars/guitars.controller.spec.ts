import { Test, TestingModule } from '@nestjs/testing';
import { GuitarsController } from './guitars.controller';
import { GuitarsService } from './guitars.service';

describe('GuitarsController', () => {
  let controller: GuitarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuitarsController],
      providers: [GuitarsService],
    }).compile();

    controller = module.get<GuitarsController>(GuitarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
