// src/analytics/analytics.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  private getDateRange(period: string): { startDate: Date; endDate: Date } {
    const endDate = new Date();
    let startDate = new Date();

    switch (period) {
      case 'last-week':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case 'last-month':
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      case 'last-3-months':
        startDate.setMonth(endDate.getMonth() - 3);
        break;
      case 'last-6-months':
        startDate.setMonth(endDate.getMonth() - 6);
        break;
      case 'last-year':
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      default:
        throw new Error('Invalid period');
    }

    return { startDate, endDate };
  }

  @Get('revenue/:period/:companyId')
  async getRevenue(
    @Param('period') period: string,
    @Param('companyId') companyId: string,
  ) {
    const { startDate, endDate } = this.getDateRange(period);
    return this.analyticsService.getRevenue(startDate, endDate, companyId);
  }

  @Get('sold-listings/:period/:companyId')
  async getSoldListings(
    @Param('period') period: string,
    @Param('companyId') companyId: string,
  ) {
    const { startDate, endDate } = this.getDateRange(period);
    return this.analyticsService.getSoldListingsCount(
      startDate,
      endDate,
      companyId,
    );
  }

  @Get('car-make-sold/:period/:make')
  async getSpecificCarMakeSold(
    @Param('period') period: string,
    @Param('make') make: string,
  ) {
    const { startDate, endDate } = this.getDateRange(period);
    return this.analyticsService.getSpecificCarMakeSoldCount(
      startDate,
      endDate,
      make,
    );
  }

  @Get('car-model-sold/:period/:model')
  async getSpecificCarModelSold(
    @Param('period') period: string,
    @Param('model') model: string,
  ) {
    const { startDate, endDate } = this.getDateRange(period);
    return this.analyticsService.getSpecificCarModelSoldCount(
      startDate,
      endDate,
      model,
    );
  }

  @Get('new-listings/:period')
  async getNewListings(@Param('period') period: string) {
    const { startDate, endDate } = this.getDateRange(period);
    return this.analyticsService.getNewListings(startDate, endDate);
  }

  @Get('new-listings/car-makes/:period')
  async getNewListingsCarMakes(@Param('period') period: string) {
    const { startDate, endDate } = this.getDateRange(period);
    return this.analyticsService.getNewListingsCarMakes(startDate, endDate);
  }

  @Get('new-listings/car-models/:period')
  async getNewListingsCarModels(@Param('period') period: string) {
    const { startDate, endDate } = this.getDateRange(period);
    return this.analyticsService.getNewListingsCarModels(startDate, endDate);
  }

  @Get('top-earning-companies/:period')
  async getTopEarningCompanies(@Param('period') period: string) {
    const { startDate, endDate } = this.getDateRange(period);
    return this.analyticsService.getTopEarningCompanies(startDate, endDate);
  }
}
