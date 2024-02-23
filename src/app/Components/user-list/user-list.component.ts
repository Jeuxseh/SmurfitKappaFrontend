
import { Component, ViewChild } from '@angular/core';
import { User } from '../../Models/user';
import { SharedDataService } from '../../Services/shared-data.service';
import { UserService } from '../../Services/user-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, SortDirection } from '@angular/material/sort';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent {
  public userList: User[] = [];
  rowData: any;
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['userId', 'firstName', 'lastName', 'email'];
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private sharedDataService: SharedDataService, private userService: UserService) { }

  onSelectRow(rowData: any) {
    this.sharedDataService.setSelectedRow(rowData);
  }

  sortColumn: keyof User = 'userId';
  sortDirection: string = 'asc';

  onSort(column: keyof User): void {
    if (column === this.sortColumn) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.userList.sort((a, b) => {
      const aValue = column === 'userId' ? +a[column] : a[column];
      const bValue = column === 'userId' ? +b[column] : b[column];

      if (this.sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return bValue > aValue ? 1 : -1;
      }
    });
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(res => {
      if (res.error != null && res.error != undefined && res.error != '') {
        console.log(res.error);
      }
      this.userList = res.genericObject;
    })
  }

}
