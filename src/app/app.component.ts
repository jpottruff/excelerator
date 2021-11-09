import { Component, Output } from "@angular/core";
import { EventEmitter } from "events";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  @Output() filesRequested = new EventEmitter();

  files: any[];

  setFiles(files) {
    this.files = files;
  }
}
