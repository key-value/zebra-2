import { Get, Controller } from '@nestjs/common';

@Controller('target')
export class TargetController {
  @Get()
  root(): string {
    return '1111';
  }
}
