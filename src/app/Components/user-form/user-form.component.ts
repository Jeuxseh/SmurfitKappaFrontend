import { Component, Input, OnInit, TemplateRef, ViewChild, OnChanges } from '@angular/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { User } from '../../Models/user';
import { UserService } from '../../Services/user-service.service';
import { SharedDataService } from '../../Services/shared-data.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})

export class UserFormComponent {

  userForm!: FormGroup;
  sent: boolean = false;
  requestResult: string = '';
  userIdQueryString!: number;
  firstNameQueryString: string = '';
  lastNameQueryString: string ='';
  emailQueryString: string = '';
  selectedRowData: any;

  constructor(private userServices: UserService,
    private sharedDataService: SharedDataService,
    private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      userId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.sharedDataService.selectedRow$.subscribe((rowData) => {
      this.selectedRowData = rowData;
      this.userForm.patchValue({
        userId: rowData?.userId || '',
        firstName: rowData?.firstName || '',
        lastName: rowData?.lastName || '',
        email: rowData?.email || '',
      });
    });
  }


  get getFormControls(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  public addUser() {
    if (this.userForm.invalid) {
      return;
    }
    console.log("Valid")
    let user: User =
    {
      userId: this.userForm.controls['userId'].value,
      firstName: this.userForm.controls['firstName'].value,
      lastName: this.userForm.controls['lastName'].value,
      email: this.userForm.controls['email'].value,
    };


    this.userServices.addUser(user).subscribe(res => {
      if (res.error != null && res.error != '')
        this.requestResult = res.text;
      else
        this.requestResult = "User added correctly";

    });
    window.location.reload();
  }

  selectRow(rowData: any): void {
    this.userForm.patchValue({
      userId: rowData.userId,
      firstName: rowData.firstName,
      lastName: rowData.lastName,
      email: rowData.email,
    });

    this.selectedRowData = rowData;
  }

  public updateUser() {
    console.log("update", this.userForm);
    this.sent = true;
    if (this.userForm.invalid) {
      return;
    }

    let user: User =
    {
      userId: this.userForm.controls['userId'].value,
      firstName: this.userForm.controls['firstName'].value,
      lastName: this.userForm.controls['lastName'].value,
      email: this.userForm.controls['email'].value,
    };

    this.userServices.updateUser(user, this.userIdQueryString).subscribe(res => {
      if (res.error != null && res.error != '')
        this.requestResult = res.text;
      else
        this.requestResult = "User updated correctly";

    });

    window.location.reload();
  }

  public deleteUser() {
    console.log("deleteeee");
    if (this.userForm.invalid) {
      console.log(this.userForm);
      return;
    }

    let user: User =
    {
      userId: this.userForm.controls['userId'].value,
      firstName: this.userForm.controls['firstName'].value,
      lastName: this.userForm.controls['lastName'].value,
      email: this.userForm.controls['email'].value,
    };

    this.userServices.deleteUser(user.userId).subscribe(res => {
      if (res.error != null && res.error != '')
        this.requestResult = res.text;
      else
        this.requestResult = "User removed correctly";
    });
    window.location.reload();
  }
}

