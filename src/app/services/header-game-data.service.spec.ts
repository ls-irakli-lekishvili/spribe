import { TestBed } from '@angular/core/testing';

import { HeaderGameDataService } from './header-game-data.service';

describe('HeaderGameDataService', () => {
  let service: HeaderGameDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderGameDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
