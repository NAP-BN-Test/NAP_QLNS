import { DatePipe } from '@angular/common';
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
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<AddUpdateDecidedIncreaseSalariesComponent>
  ) {
    this.myForm = this.formBuilder.group({
      decisionCode: [mData ? mData.decisionCode : ''],
      decisionDate: [mData ? mData.decisionDate : ''],
      salaryIncrease: [mData ? mData.salaryIncrease : ''],
      status: [mData ? mData.status : ''],
      stopDate: [mData ? mData.stopDate : ''],
      stopReason: [mData ? mData.stopReason : ''],
    });
  }

  ngOnInit() {}

  onSubmit(value) {
    value.stopDate = value.stopDate
      ? this.datePipe.transform(value.stopDate, 'yyyy-MM-dd')
      : null;
    value.decisionDate = value.decisionDate
      ? this.datePipe.transform(value.decisionDate, 'yyyy-MM-dd')
      : null;
    this.dialogRef.close({
      value: value,
    });
  }
}
