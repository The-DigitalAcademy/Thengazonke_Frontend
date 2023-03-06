/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CurrentRouteService } from './current-route.service';

describe('Service: CurrentRoute', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentRouteService]
    });
  });

  it('should ...', inject([CurrentRouteService], (service: CurrentRouteService) => {
    expect(service).toBeTruthy();
  }));
});
