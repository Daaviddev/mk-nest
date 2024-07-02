// src/listing-details/listing-details.module.ts
import { Module } from '@nestjs/common';
import { ListingDetailsService } from './listing-details.service';
import { ListingDetailsController } from './listing-details.controller';

@Module({
  providers: [ListingDetailsService],
  controllers: [ListingDetailsController],
})
export class ListingDetailsModule {}
