import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-add-update-staff',
  templateUrl: './add-update-staff.component.html',
  styleUrls: ['./add-update-staff.component.less'],
})
export class AddUpdateStaffComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public mService: AppModuleService,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    public dialogRef: MatDialogRef<AddUpdateStaffComponent>
  ) {
    this.myForm = this.formBuilder.group({
      staffCode: [mData ? mData.staffCode : ''],
      staffName: [mData ? mData.staffName : ''],
      cmndNumber: [mData ? mData.cmndNumber : ''],
      address: [mData ? mData.address : ''],
      idNation: [mData ? mData.idNation : ''],
      phoneNumber: [mData ? mData.phoneNumber : ''],
      gender: [mData ? mData.gender : ''],
      idBoPhan: [mData ? mData.idBoPhan : ''],
      idChucVu: [mData ? mData.idChucVu : ''],
      taxCode: [mData ? mData.taxCode : ''],
      bankNumber: [mData ? mData.bankNumber : ''],
      bankName: [mData ? mData.bankName : ''],
      birthday: [mData ? mData.birthday : ''],
      degree: [mData ? mData.degree : ''],
      permanentResidence: [mData ? mData.permanentResidence : ''],
      probationaryDate: [mData ? mData.probationaryDate : ''],
      probationarySalary: [mData ? mData.probationarySalary : ''],
      workingDate: [mData ? mData.workingDate : ''],
      workingSalary: [mData ? mData.workingSalary : ''],
      bhxhSalary: [mData ? mData.bhxhSalary : ''],
      contactUrgent: [mData ? mData.contactUrgent : ''],
      idMayChamCong: [mData ? mData.idMayChamCong : ''],
      email: [mData ? mData.email : ''],
      age: [mData ? mData.age : ''],
    });
  }

  ngOnInit() {}

  onClickOk(event) {
    this.dialogRef.close({
      staffCode: this.myForm.value.staffCode,
      timekeeperCode: this.myForm.value.timekeeperCode,
      personalTaxCode: this.myForm.value.personalTaxCode,
      staffName: this.myForm.value.staffName,
      phone: this.myForm.value.phone,
      birthday: this.myForm.value.birthday,
      email: this.myForm.value.email,
      gender: this.myForm.value.gender,
      stkNH: this.myForm.value.stkNH,
      departmentName: this.myForm.value.departmentName,
      homeTown: this.myForm.value.homeTown,
      currentResidence: this.myForm.value.currentResidence,
      permanentResidence: this.myForm.value.permanentResidence,
      age: this.myForm.value.age,
      bank: this.myForm.value.bank,
      position: this.myForm.value.position,
    });
  }
}
