import { Test, TestingModule } from '@nestjs/testing';
import { ListingDetailsService } from './listing-details.service';

describe('ListingDetailsService', () => {
  let service: ListingDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListingDetailsService],
    }).compile();

    service = module.get<ListingDetailsService>(ListingDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
