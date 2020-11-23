import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-add-update-staff-status',
  templateUrl: './add-update-staff-status.component.html',
  styleUrls: ['./add-update-staff-status.component.less'],
})
export class AddUpdateStaffStatusComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public mService: AppModuleService,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    public dialogRef: MatDialogRef<AddUpdateStaffStatusComponent>
  ) {
    this.myForm = this.formBuilder.group({
      description: [mData ? mData.description : ''],
      employeeStatus: [mData ? mData.employeeStatus : ''],
      dateStart: [mData ? mData.dateStart : ''],
      dateEnd: [mData ? mData.dateEnd : ''],
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
