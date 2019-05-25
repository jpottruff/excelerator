import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit {
  

  inDropArea = false;

  uploadList: any = [{name: 'lucy'}, {name: 'jim'}];
  filesToUpload = 0;
  filesUploaded = 0;
  progressBarValue = 0;

  @Output() uploadedFilesEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  setHighlight(e) {
    e.preventDefault();
    e.stopPropagation();
    (e.type === 'dragenter' || e.type === 'dragover') ? this.inDropArea = true : this.inDropArea = false;
  }

  handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.inDropArea = false;

    console.log('handling');
    const data = e.dataTransfer;
    const files = data.files;
    this.uploadFiles(files);
  }

  uploadFiles(fileList) {
    const files = Array.from(fileList);
    const numFiles = files.length;
    this.filesToUpload = numFiles;

    // Add Files to the Upload List
    files.forEach((file) => {
      this.uploadList.push(file);

      this.filesUploaded++;
      this.progressBarValue = this.filesUploaded / this.filesToUpload * 100;
    });

    // Send them to the Control Pannel so they can be processed
    this.uploadedFilesEvent.emit(this.uploadList);

    // Reset the Progress Bar
    this.resetProgressBar();
  }

  resetProgressBar() {
    this.filesToUpload = 0;
    this.filesUploaded = 0;
    // Displays Progress Bar breifly before resetting
    setTimeout(() => this.progressBarValue = 0, 250);
  }

}
