import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TendancesComponent } from './tendances.component';

describe('TendancesComponent', () => {
  let component: TendancesComponent;
  let fixture: ComponentFixture<TendancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TendancesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TendancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
