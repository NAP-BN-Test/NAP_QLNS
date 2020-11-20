import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-add-update-holiday',
  templateUrl: './add-update-holiday.component.html',
  styleUrls: ['./add-update-holiday.component.less'],
})
export class AddUpdateHolidayComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public mService: AppModuleService,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    public dialogRef: MatDialogRef<AddUpdateHolidayComponent>
  ) {
    this.myForm = this.formBuilder.group({
      nameHoliday: [mData ? mData.nameHoliday : ''],
      description: [mData ? mData.description : ''],
      codeHoliday: [mData ? mData.codeHoliday : ''],
    });
  }

  ngOnInit() {}

  onClickOk(event) {
    this.dialogRef.close({
      nameHoliday: this.myForm.value.nameHoliday,
      description: this.myForm.value.description,
      codeHoliday: this.myForm.value.codeHoliday,
    });
  }
}
