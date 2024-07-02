// src/analytics/analytics.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { listing } from '@prisma/client';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  private getStartDate(
    period: 'week' | 'month' | 'three-months' | 'six-months' | 'year',
  ): Date {
    const now = new Date();
    switch (period) {
      case 'week':
        return new Date(now.setDate(now.getDate() - 7));
      case 'month':
        return new Date(now.setMonth(now.getMonth() - 1));
      case 'three-months':
        return new Date(now.setMonth(now.getMonth() - 3));
      case 'six-months':
        return new Date(now.setMonth(now.getMonth() - 6));
      case 'year':
        return new Date(now.setFullYear(now.getFullYear() - 1));
      default:
        throw new Error('Invalid period');
    }
  }

  async getNewListings(startDate: Date, endDate: Date): Promise<listing[]> {
    return this.prisma.listing.findMany({
      where: {
        listingDetails: {
          addDate: {
            gte: startDate,
            lte: endDate,
          },
        },
      },
      include: {
        car: true,
        company: true,
        listingDetails: true,
      },
    });
  }

  async getNewListingsCarMakes(
    startDate: Date,
    endDate: Date,
  ): Promise<{ make: string; count: number }[]> {
    const result = await this.prisma.car.groupBy({
      by: ['make'],
      _count: {
        id: true,
      },
      where: {
        listings: {
          some: {
            listingDetails: {
              addDate: {
                gte: startDate,
                lte: endDate,
              },
            },
          },
        },
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
    });

    return result.map((r) => ({
      make: r.make,
      count: r._count.id ?? 0,
    }));
  }

  async getNewListingsCarModels(
    startDate: Date,
    endDate: Date,
  ): Promise<{ model: string; count: number }[]> {
    const result = await this.prisma.car.groupBy({
      by: ['model'],
      _count: {
        id: true,
      },
      where: {
        listings: {
          some: {
            listingDetails: {
              addDate: {
                gte: startDate,
                lte: endDate,
              },
            },
          },
        },
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
    });

    return result.map((r) => ({
      model: r.model,
      count: r._count.id ?? 0,
    }));
  }

  async getRevenue(
    startDate: Date,
    endDate: Date,
    companyId?: string,
  ): Promise<number> {
    const result = await this.prisma.listing.aggregate({
      _sum: {
        price: true,
      },
      where: {
        isSold: true,
        isSoldChangedAt: {
          gte: startDate,
          lte: endDate,
        },
        companyId: companyId ? companyId : undefined,
      },
    });
    return result._sum.price ?? 0;
  }

  async getSoldListingsCount(
    startDate: Date,
    endDate: Date,
    companyId?: string,
  ): Promise<number> {
    return this.prisma.listing.count({
      where: {
        isSold: true,
        isSoldChangedAt: {
          gte: startDate,
          lte: endDate,
        },
        companyId: companyId ? companyId : undefined,
      },
    });
  }

  async getSpecificCarMakeSoldCount(
    startDate: Date,
    endDate: Date,
    make: string,
  ): Promise<number> {
    return this.prisma.listing.count({
      where: {
        isSold: true,
        isSoldChangedAt: {
          gte: startDate,
          lte: endDate,
        },
        car: {
          make,
        },
      },
    });
  }

  async getSpecificCarModelSoldCount(
    startDate: Date,
    endDate: Date,
    model: string,
  ): Promise<number> {
    return this.prisma.listing.count({
      where: {
        isSold: true,
        isSoldChangedAt: {
          gte: startDate,
          lte: endDate,
        },
        car: {
          model,
        },
      },
    });
  }

  async getTopEarningCompanies(
    startDate: Date,
    endDate: Date,
  ): Promise<{ companyId: string; revenue: number }[]> {
    const result = await this.prisma.listing.groupBy({
      by: ['companyId'],
      _sum: {
        price: true,
      },
      where: {
        isSold: true,
        isSoldChangedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        _sum: {
          price: 'desc',
        },
      },
    });

    return result.map((r) => ({
      companyId: r.companyId,
      revenue: r._sum.price ?? 0,
    }));
  }
}
