import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private selectedRowSource = new BehaviorSubject<any>(null);
  selectedRow$ = this.selectedRowSource.asObservable();

  constructor() { }

  setSelectedRow(rowData: any) {
    this.selectedRowSource.next(rowData);
  }
}
