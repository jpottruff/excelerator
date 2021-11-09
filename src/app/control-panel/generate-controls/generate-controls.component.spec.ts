import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GenerateControlsComponent } from './generate-controls.component';

describe('GenerateControlsComponent', () => {
  let component: GenerateControlsComponent;
  let fixture: ComponentFixture<GenerateControlsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
