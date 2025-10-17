// src/chat/dto/create-chat.dto.ts

import { IsString, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class MessageDto {
  @IsString()
  from: string;

  @IsString()
  text: string;
}

export class CreateChatDto {
  @IsString()
  message: string;

  @IsString()
  sessionId: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MessageDto)
  history?: MessageDto[];
}
