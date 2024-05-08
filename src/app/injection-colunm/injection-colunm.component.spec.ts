import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InjectionColunmComponent } from './injection-colunm.component';

describe('InjectionColunmComponent', () => {
  let component: InjectionColunmComponent;
  let fixture: ComponentFixture<InjectionColunmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InjectionColunmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InjectionColunmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
