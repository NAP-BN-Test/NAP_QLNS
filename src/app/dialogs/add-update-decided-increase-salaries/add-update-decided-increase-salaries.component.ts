import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-add-update-decided-increase-salaries',
  templateUrl: './add-update-decided-increase-salaries.component.html',
  styleUrls: ['./add-update-decided-increase-salaries.component.less'],
})
export class AddUpdateDecidedIncreaseSalariesComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public mService: AppModuleService,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    public dialogRef: MatDialogRef<AddUpdateDecidedIncreaseSalariesComponent>
  ) {
    this.myForm = this.formBuilder.group({
      staffName: [mData ? mData.staffName : ''],
      staffCode: [mData ? mData.staffCode : ''],
      decisionCode: [mData ? mData.decisionCode : ''],
      decisionDate: [mData ? mData.decisionDate : ''],
      salaryIncrease: [mData ? mData.salaryIncrease : ''],
      status: [mData ? mData.status : ''],
      stopDate: [mData ? mData.stopDate : ''],
      stopReason: [mData ? mData.stopReason : ''],
    });
  }

  ngOnInit() {}

  onClickOk(event) {
    this.dialogRef.close({
      decisionCode: this.myForm.value.decisionCode,
      decisionDate: this.myForm.value.decisionDate,
      salaryIncrease: this.myForm.value.salaryIncrease,
      status: this.myForm.value.status,
      stopDate: this.myForm.value.stopDate,
      stopReason: this.myForm.value.stopReason,
    });
  }
}
