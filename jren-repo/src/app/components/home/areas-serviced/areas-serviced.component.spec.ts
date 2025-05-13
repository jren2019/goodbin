import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasServicedComponent } from './areas-serviced.component';

describe('AreasServicedComponent', () => {
  let component: AreasServicedComponent;
  let fixture: ComponentFixture<AreasServicedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreasServicedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreasServicedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
