// src/chat/controller.ts

import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChatService } from './models-ia.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async handleChat(@Body() createChatDto: CreateChatDto) {
    const userId = '1'; // o como obtengas el userId
    return this.chatService.sendToN8nWebhook(createChatDto, userId);
  }
}
