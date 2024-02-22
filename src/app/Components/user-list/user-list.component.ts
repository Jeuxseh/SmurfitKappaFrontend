
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from '../../Models/user';
import { SharedDataService } from '../../Services/shared-data.service';
import { UserService } from '../../Services/user-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  public userList: User[] = [];
  rowData: any;
  constructor(private sharedDataService: SharedDataService, private userService: UserService) { }

  onSelectRow(rowData: any) {
    this.sharedDataService.setSelectedRow(rowData);
  }

  ngOnInit(): void {
    this.getAllUsers();
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
