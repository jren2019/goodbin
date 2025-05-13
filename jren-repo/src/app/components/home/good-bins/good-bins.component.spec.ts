import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodBinsComponent } from './good-bins.component';

describe('GoodBinsComponent', () => {
  let component: GoodBinsComponent;
  let fixture: ComponentFixture<GoodBinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodBinsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoodBinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
