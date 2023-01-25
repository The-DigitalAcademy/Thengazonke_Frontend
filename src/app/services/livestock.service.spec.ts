/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LivestockService } from './livestock.service';

describe('Service: Livestock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LivestockService]
    });
  });

  it('should ...', inject([LivestockService], (service: LivestockService) => {
    expect(service).toBeTruthy();
  }));
});
