import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class XlsxService {

  fileName = 'MySweetFile.xlsx';
  sheetName = 'Sweet Sheet';


  constructor() { }
  
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
