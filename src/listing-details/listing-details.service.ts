// src/listing-details/listing-details.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, listingDetails } from '@prisma/client';

@Injectable()
export class ListingDetailsService {
  constructor(private prisma: PrismaService) {}

  async getAllListingDetails(): Promise<listingDetails[]> {
    return this.prisma.listingDetails.findMany();
  }

  async getListingDetailsById(id: string): Promise<listingDetails | null> {
    return this.prisma.listingDetails.findUnique({
      where: { id },
    });
  }

  async createListingDetails(
    data: Prisma.listingDetailsCreateInput,
  ): Promise<listingDetails> {
    return this.prisma.listingDetails.create({
      data,
    });
  }

  async updateListingDetails(
    id: string,
    data: Prisma.listingDetailsUpdateInput,
  ): Promise<listingDetails> {
    return this.prisma.listingDetails.update({
      where: { id },
      data,
    });
  }

  async deleteListingDetails(id: string): Promise<listingDetails> {
    return this.prisma.listingDetails.delete({
      where: { id },
    });
  }
}
