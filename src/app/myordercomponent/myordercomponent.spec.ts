import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Myordercomponent } from './myordercomponent';

describe('Myordercomponent', () => {
  let component: Myordercomponent;
  let fixture: ComponentFixture<Myordercomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Myordercomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Myordercomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
