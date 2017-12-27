import { TestBed, inject } from '@angular/core/testing';

import { GeolocatorService } from './geolocator.service';

describe('GeolocatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeolocatorService]
    });
  });

  it('should be created', inject([GeolocatorService], (service: GeolocatorService) => {
    expect(service).toBeTruthy();
  }));
});
