import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hompgae } from './hompgae';

describe('Hompgae', () => {
  let component: Hompgae;
  let fixture: ComponentFixture<Hompgae>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hompgae]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hompgae);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
