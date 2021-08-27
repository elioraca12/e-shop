import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInventoryFormComponent } from './add-inventory-form.component';

describe('AddInventoryFormComponent', () => {
  let component: AddInventoryFormComponent;
  let fixture: ComponentFixture<AddInventoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInventoryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInventoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
