import { Test, TestingModule } from '@nestjs/testing';
import { PlanController } from './plan.controller';

describe('Plan Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [PlanController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: PlanController = module.get<PlanController>(PlanController);
    expect(controller).toBeDefined();
  });
});
