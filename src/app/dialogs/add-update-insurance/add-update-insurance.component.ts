import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-add-update-insurance',
  templateUrl: './add-update-insurance.component.html',
  styleUrls: ['./add-update-insurance.component.less'],
})
export class AddUpdateInsuranceComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    public mService: AppModuleService,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    public dialogRef: MatDialogRef<AddUpdateInsuranceComponent>
  ) {
    this.myForm = this.formBuilder.group({
      companyBHXH: [mData ? mData.companyBHXH : ''],
      companyBHYT: [mData ? mData.companyBHYT : ''],
      companyBHTN: [mData ? mData.companyBHTN : ''],
      staffBHXH: [mData ? mData.staffBHXH : ''],
      staffBHYT: [mData ? mData.staffBHYT : ''],
      staffBHTN: [mData ? mData.staffBHTN : ''],
      dateStart: [mData ? mData.dateStart : ''],
      dateEnd: [mData ? mData.dateEnd : ''],
    });
  }

  ngOnInit() {}

  onSubmit(value) {
    value.dateStart = value.dateStart
      ? this.datePipe.transform(value.dateStart, 'yyyy-MM-dd')
      : null;
    value.dateEnd = value.dateEnd
      ? this.datePipe.transform(value.dateEnd, 'yyyy-MM-dd')
      : null;
    this.dialogRef.close({
      value: value,
    });
  }
}
