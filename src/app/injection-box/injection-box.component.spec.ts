import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InjectionBoxComponent } from './injection-box.component';

describe('InjectionBoxComponent', () => {
  let component: InjectionBoxComponent;
  let fixture: ComponentFixture<InjectionBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InjectionBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InjectionBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
