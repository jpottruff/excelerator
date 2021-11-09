import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ParsingService } from 'src/app/services/parsing/parsing.service';
import { XlsxService } from 'src/app/services/xlsx/xlsx.service';

@Component({
  selector: 'app-generate-controls',
  templateUrl: './generate-controls.component.html',
  styleUrls: ['./generate-controls.component.scss'],
  providers: [ParsingService, XlsxService]
})
export class GenerateControlsComponent implements OnInit {
  @Input() files: any[];

  constructor(private parsingService: ParsingService,
              private xlsxService: XlsxService ) { }

  ngOnInit() {
  }

  async generateXLSX() {
    // Filter the files to extract the relevant data
    const uploadedFiles = this.files;

    // Convert the files to JSON
    const convertedFiles = await uploadedFiles.map((file) => this.xlsxService.convertFileToJSON(file));
    const JSONfiles = await Promise.all(convertedFiles);

    // Send to Parsing Service for Processing
    const processedFiles = await this.parsingService.processFiles(JSONfiles);

    // Make an AOA from the Processed Files
    const wsAOA = await this.parsingService.combineFiles(processedFiles);

    // Create the new xlsx Workbook and Export it
    this.xlsxService.createXLSX(wsAOA);
  }

}
