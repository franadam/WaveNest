import { Test, TestingModule } from '@nestjs/testing';
import { GuitarsService } from './guitars.service';

describe('GuitarsService', () => {
  let service: GuitarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuitarsService],
    }).compile();

    service = module.get<GuitarsService>(GuitarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
