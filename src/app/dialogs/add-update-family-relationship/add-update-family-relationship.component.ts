import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-add-update-family-relationship',
  templateUrl: './add-update-family-relationship.component.html',
  styleUrls: ['./add-update-family-relationship.component.less'],
})
export class AddUpdateFamilyRelationshipComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public mService: AppModuleService,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    public dialogRef: MatDialogRef<AddUpdateFamilyRelationshipComponent>
  ) {
    this.myForm = this.formBuilder.group({
      name: [mData ? mData.name : ''],
      birthday: [mData ? mData.birthday : ''],
      gender: [mData ? mData.gender : ''],
      cmt: [mData ? mData.cmt : ''],
      address: [mData ? mData.address : ''],
      work: [mData ? mData.work : ''],
      relationship: [mData ? mData.relationship : ''],
      reduce: [mData ? mData.reduce : ''],
      job: [''],
      soHoChieu: [''],
      noiCap: [''],
      ngayCHC: [''],
      ngayCap: [''],
      noiCapHC: [''],
      ngayBDQH: [''],
      noiOHT: [''],
      ngayKTMQH: [''],
      maSoThue: [''],
      tinhTTT: [''],
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
