import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updateproductdata } from './updateproductdata';

describe('Updateproductdata', () => {
  let component: Updateproductdata;
  let fixture: ComponentFixture<Updateproductdata>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Updateproductdata]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Updateproductdata);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
