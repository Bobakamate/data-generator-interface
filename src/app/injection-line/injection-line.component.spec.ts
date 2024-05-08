import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InjectionLineComponent } from './injection-line.component';

describe('InjectionLineComponent', () => {
  let component: InjectionLineComponent;
  let fixture: ComponentFixture<InjectionLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InjectionLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InjectionLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
