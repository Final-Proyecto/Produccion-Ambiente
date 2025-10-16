import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { UsersModule } from './modules/users/users.module';
@Module({
  imports: [AuthModule, InventoryModule, UsersModule],
})
export class AppModule {}
