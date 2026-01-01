import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sellerauthcomponent } from './sellerauthcomponent';

describe('Sellerauthcomponent', () => {
  let component: Sellerauthcomponent;
  let fixture: ComponentFixture<Sellerauthcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sellerauthcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sellerauthcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
