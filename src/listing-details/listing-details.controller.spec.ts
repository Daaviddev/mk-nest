import { Test, TestingModule } from '@nestjs/testing';
import { ListingDetailsController } from './listing-details.controller';

describe('ListingDetailsController', () => {
  let controller: ListingDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListingDetailsController],
    }).compile();

    controller = module.get<ListingDetailsController>(ListingDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
