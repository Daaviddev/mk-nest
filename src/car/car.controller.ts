// src/car/car.controller.ts
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CarService } from './car.service';
import { car, Prisma } from '@prisma/client';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  async getAllCars(): Promise<car[]> {
    return this.carService.getAllCars();
  }

  @Get(':id')
  async getCarById(@Param('id') id: string): Promise<car | null> {
    return this.carService.getCarById(id);
  }

  @Post()
  async createCar(@Body() data: Prisma.carCreateInput): Promise<car> {
    return this.carService.createCar(data);
  }

  @Put(':id')
  async updateCar(
    @Param('id') id: string,
    @Body() data: Prisma.carUpdateInput,
  ): Promise<car> {
    return this.carService.updateCar(id, data);
  }

  @Delete(':id')
  async deleteCar(@Param('id') id: string): Promise<car> {
    return this.carService.deleteCar(id);
  }
}
