import { TestBed } from '@angular/core/testing';
import { HomeServices } from './home-services.service';

describe('HomeServicesService', () => {
  let service: HomeServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
