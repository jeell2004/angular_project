import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formcomponent2 } from './formcomponent2';

describe('Formcomponent2', () => {
  let component: Formcomponent2;
  let fixture: ComponentFixture<Formcomponent2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formcomponent2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Formcomponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
