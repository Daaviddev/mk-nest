// src/listing-details/listing-details.controller.ts
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ListingDetailsService } from './listing-details.service';
import { listingDetails, Prisma } from '@prisma/client';

@Controller('listing-details')
export class ListingDetailsController {
  constructor(private readonly listingDetailsService: ListingDetailsService) {}

  @Get()
  async getAllListingDetails(): Promise<listingDetails[]> {
    return this.listingDetailsService.getAllListingDetails();
  }

  @Get(':id')
  async getListingDetailsById(
    @Param('id') id: string,
  ): Promise<listingDetails | null> {
    return this.listingDetailsService.getListingDetailsById(id);
  }

  @Post()
  async createListingDetails(
    @Body() data: Prisma.listingDetailsCreateInput,
  ): Promise<listingDetails> {
    return this.listingDetailsService.createListingDetails(data);
  }

  @Put(':id')
  async updateListingDetails(
    @Param('id') id: string,
    @Body() data: Prisma.listingDetailsUpdateInput,
  ): Promise<listingDetails> {
    return this.listingDetailsService.updateListingDetails(id, data);
  }

  @Delete(':id')
  async deleteListingDetails(@Param('id') id: string): Promise<listingDetails> {
    return this.listingDetailsService.deleteListingDetails(id);
  }
}
