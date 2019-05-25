import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as XLSX from 'xlsx';
import { resolve } from 'url';

@Component({
  selector: 'app-generate-controls',
  templateUrl: './generate-controls.component.html',
  styleUrls: ['./generate-controls.component.scss']
})
export class GenerateControlsComponent implements OnInit {
  @Input() files: any[];

  // FIX ME - these will come from something user can set
  dataToFilterByList = ['dog', 'cat', 'fish' ];
  columnToFilter = 3;
  columnsToInclude = [0, 2, 6];

  headers = ['these', 'are', 'headers'];
  fileName = 'MySweetFile.xlsx';
  sheetName = 'Sweet Sheet';

  constructor() { }

  ngOnInit() {
  }

  async generateXLSX() {
    // Filter the files to extract the relevant data
    const uploadedFiles = this.files;
    const processedFiles = await this.processFiles(uploadedFiles);

    // Make an AOA from the Processed Files
    const wsAOA = await this.combineFiles(processedFiles);

    //Create the new xlsx Workbook and Export it
    this.createXLSX(wsAOA);
  }

  async processFiles(files) {
    // Convert the files to JSON
    const convertedFiles = await files.map((file) => this.convertFileToJSON(file));
    const JSONfiles = await Promise.all(convertedFiles);

    // Filter the Data
    const filteredFiles = await JSONfiles.map((JSONfile) => this.getRelevantDataFromJSON(JSONfile));
    const filteredJSONFiles = await Promise.all(filteredFiles);

    // Return the filtered files in JSON format
    return new Promise(resolve => resolve(filteredJSONFiles));
  }

  convertFileToJSON(file) {
    return new Promise( resolve => {
      // Set up Reader
      const reader: FileReader = new FileReader();
      reader.readAsBinaryString(file);

      reader.onload = (e) => {
        // Read Workbook
        const biStr: any = reader.result;
        const wb: XLSX.WorkBook = XLSX.read(biStr, {type: 'binary'});

        // Grab the first sheet
        const wsName: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsName];

        // Parse the data and convert to JSON
        const wsArrays = (XLSX.utils.sheet_to_json(ws, {header: 1}));
        const wsDataAOA = wsArrays;
        const JSONfile = {  fileName: file.name,
                            wsData: wsDataAOA
                          };

        // Return the converted file
        resolve(JSONfile);
      };
    });
  }

  getRelevantDataFromJSON(JSONfile) {
    return new Promise ( resolve => {
      const incomingFileName = JSONfile.fileName;
      const incomingHeaders = JSONfile.wsData[0];
      const incomingData = JSONfile.wsData.slice(1);

      const retreivedDate = this.getDateFromFileName(incomingFileName);
      const relevantHeadersRow = this.getRelevantDataFromRow(incomingHeaders);

      // TODO - refactor
      const relevantFileDataRows = [];
      incomingData.forEach( (dataRow, i) => {
        if (this.dataToFilterByList.includes((dataRow[this.columnToFilter]))) {
          const rowNum = i + 1;
          const relevantDataRow = this.getRelevantDataFromRow(dataRow);
          relevantDataRow.push(rowNum);
          relevantFileDataRows.push(relevantDataRow);
        }
      });

      const relevantJSONData = {  fileName: JSONfile.fileName,
                                  date: retreivedDate,
                                  headerRow: relevantHeadersRow,
                                  dataRows: relevantFileDataRows }

      resolve(relevantJSONData);
    });
  }

  // Only works if date is in: 'xxxxxx(2019-01-01).xlsx'
  // TODO - account for file extensions (search for dot or whatever)
  getDateFromFileName(fileName) {
    return fileName.substr( (fileName.length - 16), 10);
  }

  getRelevantDataFromRow(row) {
    const relevantData = [];

    row.forEach((dataItem, i) => {
      if (this.columnsToInclude.includes(i)) {
        relevantData.push(dataItem);
      }
    });

    return relevantData;
  }

  combineFiles(JSONFiles){
    return new Promise (resolve => {
      const wsRows = [];
      wsRows.push(this.headers);

      // TODO - refactor
      JSONFiles.forEach( (file) => {
        file.dataRows.forEach(dataArray => {
          const row = [];
          row.push(file.date);
          dataArray.forEach(item => row.push(item));
          wsRows.push(row);
        });
      });

      resolve(wsRows);
    });
  }

  createXLSX(wsAOA) {
    // Create Worksheet from the wsAOA
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(wsAOA);

    // Create Workbook and add the WorkSheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, this.sheetName);

    // Save and Export It
    XLSX.writeFile(wb, this.fileName);
  }

}
