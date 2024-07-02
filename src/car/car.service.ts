// src/car/car.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, car } from '@prisma/client';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}

  async getAllCars(): Promise<car[]> {
    return this.prisma.car.findMany();
  }

  async getCarById(id: string): Promise<car | null> {
    return this.prisma.car.findUnique({
      where: { id },
    });
  }

  async createCar(data: Prisma.carCreateInput): Promise<car> {
    return this.prisma.car.create({
      data,
    });
  }

  async updateCar(id: string, data: Prisma.carUpdateInput): Promise<car> {
    return this.prisma.car.update({
      where: { id },
      data,
    });
  }

  async deleteCar(id: string): Promise<car> {
    return this.prisma.car.delete({
      where: { id },
    });
  }
}
