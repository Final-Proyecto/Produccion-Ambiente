import { Module } from '@nestjs/common';
import { ChatService } from './models-ia.service';
import { ChatController } from './models-ia.controller';

@Module({
  controllers: [ChatController],
  providers: [ChatService],
})
export class ModelsIaModule {}
