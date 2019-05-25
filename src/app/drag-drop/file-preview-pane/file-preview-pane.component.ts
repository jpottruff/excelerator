import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-file-preview-pane',
  templateUrl: './file-preview-pane.component.html',
  styleUrls: ['./file-preview-pane.component.scss']
})
export class FilePreviewPaneComponent implements OnInit {

  @Input() files: [];

  constructor() { }

  ngOnInit() {
  }

  removeFile(i) {
    this.files.splice(i, 1);
  }

}


