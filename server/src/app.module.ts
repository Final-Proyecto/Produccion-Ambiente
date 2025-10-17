import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { UsersModule } from './modules/users/users.module';
import { WorkersModule } from './modules/workers/workers.module';
import { ModelsIaModule } from './modules/models-ia/models-ia.module';
import { CultivosModule } from './modules/cultivos/cultivos.module';
import { CorralModule } from './modules/corral/corral.module';
import { GestionPrecioModule } from './modules/gestion-precio/gestion-precio.module';
import { AnalisisSueloModule } from './modules/analisis_suelo/analisis_suelo.module';
@Module({
  imports: [
    AuthModule,
    InventoryModule,
    UsersModule,
    WorkersModule,
    ModelsIaModule,
    CultivosModule,
    CorralModule,
    GestionPrecioModule,
    AnalisisSueloModule,
  ],
})
export class AppModule {}
