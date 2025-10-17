import { Module } from '@nestjs/common';
import { CorralService } from './corral.service';
import { CorralController } from './corral.controller';

@Module({
  controllers: [CorralController],
  providers: [CorralService],
})
export class CorralModule {}
