import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewprofilComponent } from './viewprofil.component';

describe('ViewprofilComponent', () => {
  let component: ViewprofilComponent;
  let fixture: ComponentFixture<ViewprofilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewprofilComponent]
    });
    fixture = TestBed.createComponent(ViewprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
