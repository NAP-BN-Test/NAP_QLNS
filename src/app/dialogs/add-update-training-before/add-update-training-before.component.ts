import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-add-update-training-before',
  templateUrl: './add-update-training-before.component.html',
  styleUrls: ['./add-update-training-before.component.less'],
})
export class AddUpdateTrainingBeforeComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public mService: AppModuleService,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    public dialogRef: MatDialogRef<AddUpdateTrainingBeforeComponent>
  ) {
    this.myForm = this.formBuilder.group({
      degree: [mData ? mData.degree : ''],
      major: [mData ? mData.major : ''],
      trainingPlace: [mData ? mData.trainingPlace : ''],
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
