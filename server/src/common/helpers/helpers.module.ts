import { Module } from "@nestjs/common";
import { CustomJwtService } from "./jwt.services";
import { BcryptHelper } from "./bcrypt.services";
@Module({
  providers: [CustomJwtService, BcryptHelper],
  exports: [CustomJwtService, BcryptHelper],
})
export class HelpersModule {}