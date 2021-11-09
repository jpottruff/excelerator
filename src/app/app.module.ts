import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { DragDropComponent } from "./components/drag-drop/drag-drop.component";
import { FilePreviewPaneComponent } from "./components/drag-drop/file-preview-pane/file-preview-pane.component";
import { ProgressBarComponent } from "./components/progress-bar/progress-bar.component";
import { ControlPanelComponent } from "./components/control-panel/control-panel.component";
import { GenerateControlsComponent } from "./components/control-panel/generate-controls/generate-controls.component";
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    DragDropComponent,
    FilePreviewPaneComponent,
    ProgressBarComponent,
    ControlPanelComponent,
    GenerateControlsComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
