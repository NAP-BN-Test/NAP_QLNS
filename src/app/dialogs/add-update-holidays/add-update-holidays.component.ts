import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-add-update-holidays',
  templateUrl: './add-update-holidays.component.html',
  styleUrls: ['./add-update-holidays.component.less'],
})
export class AddUpdateHolidaysComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public mService: AppModuleService,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    public dialogRef: MatDialogRef<AddUpdateHolidaysComponent>
  ) {
    this.myForm = this.formBuilder.group({
      holidayType: [mData ? mData.holidayType : ''],
      dateStart: [mData ? mData.dateStart : ''],
      dateEnd: [mData ? mData.dateEnd : ''],
    });
  }

  ngOnInit() {}

  onClickOk(event) {
    this.dialogRef.close({
      // decisionCode: this.myForm.value.decisionCode,
      // decisionDate: this.myForm.value.decisionDate,
      // salaryIncrease: this.myForm.value.salaryIncrease,
      // status: this.myForm.value.status,
      // stopDate: this.myForm.value.stopDate,
      // stopReason: this.myForm.value.stopReason,
    });
  }
}
