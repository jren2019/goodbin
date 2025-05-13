import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAQuotationComponent } from './get-aquotation.component';

describe('GetAQuotationComponent', () => {
  let component: GetAQuotationComponent;
  let fixture: ComponentFixture<GetAQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAQuotationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetAQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
