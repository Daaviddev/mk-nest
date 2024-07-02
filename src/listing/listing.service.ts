// src/listing/listing.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, listing } from '@prisma/client';

@Injectable()
export class ListingService {
  constructor(private prisma: PrismaService) {}

  async getAllListings(): Promise<listing[]> {
    return this.prisma.listing.findMany();
  }

  async getListingById(id: string): Promise<listing | null> {
    return this.prisma.listing.findUnique({
      where: { id },
    });
  }

  async createListing(data: Prisma.listingCreateInput): Promise<listing> {
    return this.prisma.listing.create({
      data,
    });
  }

  async updateListing(
    id: string,
    data: Prisma.listingUpdateInput,
  ): Promise<listing> {
    return this.prisma.listing.update({
      where: { id },
      data,
    });
  }

  async deleteListing(id: string): Promise<listing> {
    return this.prisma.listing.delete({
      where: { id },
    });
  }

  async setPromoted(id: string, isPromoted: boolean): Promise<listing> {
    if (isPromoted) {
      const promotedCount = await this.prisma.listing.count({
        where: {
          isPromoted: true,
        },
      });

      if (promotedCount >= 6) {
        throw new BadRequestException(
          'A maximum of 6 cars can be promoted at any given time.',
        );
      }
    }

    return this.prisma.listing.update({
      where: { id },
      data: { isPromoted },
    });
  }

  async setExcludeFromData(
    id: string,
    excludeFromData: boolean,
  ): Promise<listing> {
    return this.prisma.listing.update({
      where: { id },
      data: { excludeFromData },
    });
  }

  async getPromotedListings(): Promise<listing[]> {
    return this.prisma.listing.findMany({
      where: {
        isPromoted: true,
      },
      include: {
        car: true,
        company: true,
        listingDetails: true,
      },
    });
  }

  async getExcludedListings(): Promise<listing[]> {
    return this.prisma.listing.findMany({
      where: {
        excludeFromData: true,
      },
      include: {
        car: true,
        company: true,
        listingDetails: true,
      },
    });
  }

  async getFullListing(id: string): Promise<any> {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: {
        car: true,
        company: true,
        listingDetails: true,
      },
    });

    if (!listing) {
      throw new BadRequestException('Listing not found.');
    }

    return {
      listing: {
        ...listing,
        listingDetails: listing.listingDetails,
        car: listing.car,
        company: listing.company,
      },
    };
  }

  async getListingsByCompany(companyId: string): Promise<any> {
    const listings = await this.prisma.listing.findMany({
      where: { companyId },
      include: {
        car: true,
        listingDetails: true,
      },
    });

    return listings.map((listing) => ({
      listing: {
        ...listing,
        listingDetails: listing.listingDetails,
        car: listing.car,
      },
    }));
  }
}
