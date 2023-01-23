import { TestBed } from '@angular/core/testing';

import { ManagelivestockService } from './managelivestock.service';

describe('ManagelivestockService', () => {
  let service: ManagelivestockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagelivestockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
