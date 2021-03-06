import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { FilePreviewPaneComponent } from './drag-drop/file-preview-pane/file-preview-pane.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { GenerateControlsComponent } from './control-panel/generate-controls/generate-controls.component';

@NgModule({
  declarations: [
    AppComponent,
    DragDropComponent,
    FilePreviewPaneComponent,
    ProgressBarComponent,
    ControlPanelComponent,
    GenerateControlsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
