import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesBoxComponent } from './rules-box.component';

describe('RulesBoxComponent', () => {
  let component: RulesBoxComponent;
  let fixture: ComponentFixture<RulesBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulesBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
