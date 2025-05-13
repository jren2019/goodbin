import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBinsComponent } from './all-bins.component';

describe('AllBinsComponent', () => {
  let component: AllBinsComponent;
  let fixture: ComponentFixture<AllBinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllBinsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllBinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
