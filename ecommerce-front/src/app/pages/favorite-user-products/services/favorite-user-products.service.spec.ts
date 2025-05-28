import { TestBed } from '@angular/core/testing';

import { FavoriteUserProductsService } from './favorite-user-products.service';

describe('FavoriteUserProductsService', () => {
  let service: FavoriteUserProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteUserProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
