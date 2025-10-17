import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { UsersModule } from './modules/users/users.module';
import { WorkersModule } from './modules/workers/workers.module';
@Module({
  imports: [AuthModule, InventoryModule, UsersModule, WorkersModule],
})
export class AppModule {}
