import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productdetailcomponent } from './productdetailcomponent';

describe('Productdetailcomponent', () => {
  let component: Productdetailcomponent;
  let fixture: ComponentFixture<Productdetailcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productdetailcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Productdetailcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
