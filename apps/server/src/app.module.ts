import { Module } from '@nestjs/common';
import { MaterialsModule } from './materials/materials.module';
import { WorksModule } from './works/works.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { TutorialsModule } from './tutorials/tutorials.module';
import { MarketplaceModule } from './marketplace/marketplace.module';

@Module({
  imports: [
    MaterialsModule,
    WorksModule,
    UsersModule,
    OrdersModule,
    TutorialsModule,
    MarketplaceModule,
  ],
})
export class AppModule {}
