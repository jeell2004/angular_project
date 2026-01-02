import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Searchcomponent } from './searchcomponent';

describe('Searchcomponent', () => {
  let component: Searchcomponent;
  let fixture: ComponentFixture<Searchcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Searchcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Searchcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
