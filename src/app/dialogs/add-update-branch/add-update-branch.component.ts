import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-add-update-branch',
  templateUrl: './add-update-branch.component.html',
  styleUrls: ['./add-update-branch.component.less'],
})
export class AddUpdateBranchComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public mService: AppModuleService,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    public dialogRef: MatDialogRef<AddUpdateBranchComponent>
  ) {
    this.myForm = this.formBuilder.group({
      branchName: [mData ? mData.branchName : ''],
      branchCode: [mData ? mData.branchCode : ''],
      address: [mData ? mData.address : ''],
      phoneNumber: [mData ? mData.phoneNumber : ''],
      faxNumber: [mData ? mData.faxNumber : ''],
      email: [mData ? mData.email : ''],
    });
  }

  ngOnInit() {}

  onSubmit(value) {
    console.log(value);

    this.dialogRef.close({
      branchName: value.branchName,
      branchCode: value.branchCode,
      address: value.address,
      phoneNumber: value.phoneNumber,
      faxNumber: value.faxNumber,
      email: value.email,
    });
  }
}
