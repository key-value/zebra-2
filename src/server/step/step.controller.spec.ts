import { Test, TestingModule } from '@nestjs/testing';
import { StepController } from './step.controller';

describe('Step Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [StepController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: StepController = module.get<StepController>(StepController);
    expect(controller).toBeDefined();
  });
});
