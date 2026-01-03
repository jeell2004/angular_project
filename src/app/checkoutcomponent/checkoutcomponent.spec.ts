import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Checkoutcomponent } from './checkoutcomponent';

describe('Checkoutcomponent', () => {
  let component: Checkoutcomponent;
  let fixture: ComponentFixture<Checkoutcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Checkoutcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Checkoutcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
