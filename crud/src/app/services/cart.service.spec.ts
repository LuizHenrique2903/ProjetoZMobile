import { TestBed } from '@angular/core/testing';

import { CarteirinhaService } from './carteirinha.service';

describe('CartService', () => {
  let service: CarteirinhaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarteirinhaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
