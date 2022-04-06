import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipsFiltersFormComponent } from './ships-filters-form.component';

describe('ShipsFiltersFormComponent', () => {
  let component: ShipsFiltersFormComponent;
  let fixture: ComponentFixture<ShipsFiltersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShipsFiltersFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipsFiltersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
