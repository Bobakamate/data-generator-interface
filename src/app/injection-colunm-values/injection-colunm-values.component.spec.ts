import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InjectionColunmValuesComponent } from './injection-colunm-values.component';

describe('InjectionColunmValuesComponent', () => {
  let component: InjectionColunmValuesComponent;
  let fixture: ComponentFixture<InjectionColunmValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InjectionColunmValuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InjectionColunmValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
