// src/company/company.controller.ts
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { company, Prisma } from '@prisma/client';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async getAllCompanies(): Promise<company[]> {
    return this.companyService.getAllCompanies();
  }

  @Get(':id')
  async getCompanyById(@Param('id') id: string): Promise<company> {
    return this.companyService.getCompanyById(id);
  }

  @Post()
  async createCompany(
    @Body() data: Prisma.companyCreateInput,
  ): Promise<company> {
    return this.companyService.createCompany(data);
  }

  @Put(':id')
  async updateCompany(
    @Param('id') id: string,
    @Body() data: Prisma.companyUpdateInput,
  ): Promise<company> {
    return this.companyService.updateCompany(id, data);
  }

  @Delete(':id')
  async deleteCompany(@Param('id') id: string): Promise<company> {
    return this.companyService.deleteCompany(id);
  }
}
