import { DatePipe } from '@angular/common';
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
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<AddUpdateStaffStatusComponent>
  ) {
    this.myForm = this.formBuilder.group({
      describe: [mData ? mData.describe : ''],
      status: [mData ? mData.status : ''],
      dateStart: [mData ? mData.dateStart : ''],
      dateEnd: [mData ? mData.dateEnd : ''],
    });
  }

  ngOnInit() {}

  onSubmit(value) {
    value.dateStart = this.datePipe.transform(value.dateStart, 'yyyy-MM-dd');
    value.dateEnd = this.datePipe.transform(value.dateEnd, 'yyyy-MM-dd');
    console.log(value);

    this.dialogRef.close({
      value: value,
    });
  }
}
