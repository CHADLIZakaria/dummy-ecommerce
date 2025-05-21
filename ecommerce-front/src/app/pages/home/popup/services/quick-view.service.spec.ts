import { TestBed } from '@angular/core/testing';

import { QuickViewService } from './quick-view.service';

describe('QuickViewService', () => {
  let service: QuickViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuickViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
