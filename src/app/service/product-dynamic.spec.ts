import { TestBed } from '@angular/core/testing';

import { ProductDynamic } from './product-dynamic';

describe('ProductDynamic', () => {
  let service: ProductDynamic;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDynamic);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
