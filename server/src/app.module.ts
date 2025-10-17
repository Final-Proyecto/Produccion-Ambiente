import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { UsersModule } from './modules/users/users.module';
import { WorkersModule } from './modules/workers/workers.module';
import { ModelsIaModule } from './modules/models-ia/models-ia.module';
import { CultivosModule } from './modules/cultivos/cultivos.module';
@Module({
  imports: [
    AuthModule,
    InventoryModule,
    UsersModule,
    WorkersModule,
    ModelsIaModule,
    CultivosModule,
  ],
})
export class AppModule {}
