// src/listing/listing.controller.ts
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { ListingService } from './listing.service';
import { listing, Prisma } from '@prisma/client';

@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Get()
  async getAllListings(): Promise<listing[]> {
    return this.listingService.getAllListings();
  }

  @Get(':id')
  async getListingById(@Param('id') id: string): Promise<listing | null> {
    return this.listingService.getListingById(id);
  }

  @Post()
  async createListing(
    @Body() data: Prisma.listingCreateInput,
  ): Promise<listing> {
    return this.listingService.createListing(data);
  }

  @Put(':id')
  async updateListing(
    @Param('id') id: string,
    @Body() data: Prisma.listingUpdateInput,
  ): Promise<listing> {
    return this.listingService.updateListing(id, data);
  }

  @Delete(':id')
  async deleteListing(@Param('id') id: string): Promise<listing> {
    return this.listingService.deleteListing(id);
  }

  @Patch(':id/promote')
  async setPromoted(
    @Param('id') id: string,
    @Body('isPromoted') isPromoted: boolean,
  ): Promise<listing> {
    return this.listingService.setPromoted(id, isPromoted);
  }

  @Patch(':id/exclude')
  async setExcludeFromData(
    @Param('id') id: string,
    @Body('excludeFromData') excludeFromData: boolean,
  ): Promise<listing> {
    return this.listingService.setExcludeFromData(id, excludeFromData);
  }

  @Get('promoted')
  async getPromotedListings(): Promise<listing[]> {
    return this.listingService.getPromotedListings();
  }

  @Get('excluded')
  async getExcludedListings(): Promise<listing[]> {
    return this.listingService.getExcludedListings();
  }

  @Get(':id/full')
  async getFullListing(@Param('id') id: string): Promise<any> {
    return this.listingService.getFullListing(id);
  }

  @Get('company/:companyId')
  async getListingsByCompany(
    @Param('companyId') companyId: string,
  ): Promise<any> {
    return this.listingService.getListingsByCompany(companyId);
  }
}
