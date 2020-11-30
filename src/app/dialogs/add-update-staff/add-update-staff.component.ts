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
      codeStaff: [mData ? mData.codeStaff : ''],
      timekeeperCode: [mData ? mData.timekeeperCode : ''],
      personalTaxCode: [mData ? mData.personalTaxCode : ''],
      staffName: [mData ? mData.staffName : ''],
      phone: [mData ? mData.phone : ''],
      birthday: [mData ? mData.birthday : ''],
      email: [mData ? mData.email : ''],
      gender: [mData ? mData.gender : ''],
      stkNH: [mData ? mData.stkNH : ''],
      departmentName: [mData ? mData.departmentName : ''],
      homeTown: [mData ? mData.homeTown : ''],
      currentResidence: [mData ? mData.currentResidence : ''],
      permanentResidence: [mData ? mData.permanentResidence : ''],
      age: [mData ? mData.age : ''],
      bank: [mData ? mData.bank : ''],
      position: [mData ? mData.position : ''],
      bangCap: [''],
      soHD: [''],
      ngayKi: [''],
      loaiHD: [''],
      mucLuong: [''],
      ngayHH: [''],
      ttHD: [''],
    });
  }

  ngOnInit() {}

  onClickOk(event) {
    this.dialogRef.close({
      codeStaff: this.myForm.value.codeStaff,
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
