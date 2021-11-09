import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilePreviewPaneComponent } from './file-preview-pane.component';

describe('FilePreviewPaneComponent', () => {
  let component: FilePreviewPaneComponent;
  let fixture: ComponentFixture<FilePreviewPaneComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FilePreviewPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilePreviewPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
