import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  uploadedFiles = [];

  constructor() { }

  uploadFiles(fileList) {
    const files = Array.from(fileList);
    // const numFiles = files.length;
    // this.filesToUpload = numFiles;

    // Add Files to the Upload List
    files.forEach((file) => {
      this.uploadedFiles.push(file);

      // TODO - progress bar updates (maybe not here?)
      // this.filesUploaded++;
      // this.progressBarValue = this.filesUploaded / this.filesToUpload * 100;
    });

    console.log(this.uploadedFiles);
  }

  getUploadedFiles() {
    return Promise.resolve(this.uploadedFiles);
  }
}
