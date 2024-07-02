// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma.module';
import { CompanyModule } from './company/company.module';
import { ListingModule } from './listing/listing.module';
import { ListingDetailsModule } from './listing-details/listing-details.module';
import { CarModule } from './car/car.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CompanyModule,
    ListingModule,
    ListingDetailsModule,
    CarModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
