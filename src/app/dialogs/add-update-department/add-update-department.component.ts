import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-add-update-department',
  templateUrl: './add-update-department.component.html',
  styleUrls: ['./add-update-department.component.less'],
})
export class AddUpdateDepartmentComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public mService: AppModuleService,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    public dialogRef: MatDialogRef<AddUpdateDepartmentComponent>
  ) {
    this.myForm = this.formBuilder.group({
      departmentName: [mData ? mData.departmentName : ''],
      departmentCode: [mData ? mData.departmentCode : ''],
      branchName: [mData ? mData.branchName : ''],
    });
  }

  ngOnInit() {}

  onClickOk(event) {
    this.dialogRef.close({
      // codeStaff: this.myForm.value.codeStaff,
      // timekeeperCode: this.myForm.value.timekeeperCode,
      // personalTaxCode: this.myForm.value.personalTaxCode,
      // staffName: this.myForm.value.staffName,
      // phone: this.myForm.value.phone,
      // birthday: this.myForm.value.birthday,
      // email: this.myForm.value.email,
      // gender: this.myForm.value.gender,
      // stkNH: this.myForm.value.stkNH,
      // departmentName: this.myForm.value.departmentName,
      // homeTown: this.myForm.value.homeTown,
      // currentResidence: this.myForm.value.currentResidence,
      // permanentResidence: this.myForm.value.permanentResidence,
      // age: this.myForm.value.age,
      // bank: this.myForm.value.bank,
      // position: this.myForm.value.position,
    });
  }
}
