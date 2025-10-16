import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CommonModule } from 'src/common/common.module';
import { HelpersModule } from 'src/common/helpers/helpers.module';
import { PrismaModule } from 'src/common/prisma/prisma.module';
@Module({
  imports: [CommonModule, HelpersModule, PrismaModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
