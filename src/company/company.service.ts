// src/company/company.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, company } from '@prisma/client';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async getAllCompanies(): Promise<company[]> {
    return this.prisma.company.findMany();
  }

  async getCompanyById(id: string): Promise<company> {
    return this.prisma.company.findUnique({
      where: { id },
    });
  }

  async createCompany(data: Prisma.companyCreateInput): Promise<company> {
    return this.prisma.company.create({
      data,
    });
  }

  async updateCompany(
    id: string,
    data: Prisma.companyUpdateInput,
  ): Promise<company> {
    return this.prisma.company.update({
      where: { id },
      data,
    });
  }

  async deleteCompany(id: string): Promise<company> {
    return this.prisma.company.delete({
      where: { id },
    });
  }
}
