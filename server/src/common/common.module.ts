import { Module } from '@nestjs/common';
import { CustomJwtService } from './helpers/jwt.services';
import { JwtGlobalModule } from './jwt/jwt.module';
@Module({
  imports: [JwtGlobalModule],
  providers: [CustomJwtService],
  exports: [CustomJwtService, JwtGlobalModule],
})
export class CommonModule {}
