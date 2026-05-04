import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormSignUp } from './reactive-form-sign-up';

describe('ReactiveFormSignUp', () => {
  let component: ReactiveFormSignUp;
  let fixture: ComponentFixture<ReactiveFormSignUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormSignUp],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveFormSignUp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
