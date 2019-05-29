import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParsingService {

  // FIXME - abstract these 
  dataToFilterByList = ['dog', 'cat', 'fish' ];
  columnToFilter = 0;
  columnsToInclude = [0, 1, 5];
  headers = ['date', 'these', 'are', 'headers', 'item'];


  constructor() { }

  async processFiles(files) {
    // Filter the Data
    const filteredFiles = await files.map((JSONfile) => this.getRelevantDataFromJSON(JSONfile));
    const filteredJSONFiles = await Promise.all(filteredFiles);

    // Return the filtered files in JSON format
    return new Promise(resolve => resolve(filteredJSONFiles));
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
          const rowNum = i + 2;
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
}
