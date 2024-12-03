import { TestBed } from '@angular/core/testing';

import { CategoriesInterceptor } from './categories.interceptor';

describe('CategoriesInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CategoriesInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CategoriesInterceptor = TestBed.inject(CategoriesInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
