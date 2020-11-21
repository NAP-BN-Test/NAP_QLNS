import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-add-update-training-after',
  templateUrl: './add-update-training-after.component.html',
  styleUrls: ['./add-update-training-after.component.less'],
})
export class AddUpdateTrainingAfterComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public mService: AppModuleService,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    public dialogRef: MatDialogRef<AddUpdateTrainingAfterComponent>
  ) {
    this.myForm = this.formBuilder.group({
      trainingCourse: [mData ? mData.trainingCourse : ''],
      chuyenNganh: [mData ? mData.chuyenNganh : ''],
      companyCost: [mData ? mData.companyCost : ''],
      personCost: [mData ? mData.personCost : ''],
      soCC: [mData ? mData.soCC : ''],
      dateStart: [mData ? mData.dateStart : ''],
      dateEnd: [mData ? mData.dateEnd : ''],
      hTTT: [''],
      ngayBatDau: [''],
      ngayKetThuc: [''],
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
