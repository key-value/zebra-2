import { Test, TestingModule } from '@nestjs/testing';
import { TargetController } from './target.controller';

describe('Target Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [TargetController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: TargetController = module.get<TargetController>(TargetController);
    expect(controller).toBeDefined();
  });
});
