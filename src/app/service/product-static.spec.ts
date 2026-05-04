import { TestBed } from '@angular/core/testing';

import { ProductStatic } from './product-static';

describe('ProductStatic', () => {
  let service: ProductStatic;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductStatic);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
