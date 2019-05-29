import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class XlsxService {

  fileName = 'MySweetFile.xlsx';
  sheetName = 'Sweet Sheet';

  
  constructor() { }

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
