import { DatePipe } from '@angular/common';
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
    private datePipe: DatePipe,
    public mService: AppModuleService,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    public dialogRef: MatDialogRef<AddUpdateTrainingAfterComponent>
  ) {
    this.myForm = this.formBuilder.group({
      trainingCourse: [mData ? mData.trainingCourse : ''],
      majors: [mData ? mData.majors : ''],
      companyCost: [mData ? mData.companyCost : ''],
      staffCost: [mData ? mData.staffCost : ''],
      numberCertificates: [mData ? mData.numberCertificates : ''],
      dateStart: [mData ? mData.dateStart : null],
      dateEnd: [mData ? mData.dateEnd : null],
      formTraining: [mData ? mData.formTraining : null],
      expirationDate: [mData ? mData.expirationDate : null],
      rangeDate: [mData ? mData.rangeDate : null],
    });
  }

  ngOnInit() {}

  onSubmit(value) {
    value.dateStart = this.datePipe.transform(value.dateStart, 'yyyy-MM-dd');
    value.dateEnd = this.datePipe.transform(value.dateEnd, 'yyyy-MM-dd');
    value.expirationDate = this.datePipe.transform(
      value.expirationDate,
      'yyyy-MM-dd'
    );
    value.rangeDate = this.datePipe.transform(value.rangeDate, 'yyyy-MM-dd');
    this.dialogRef.close({
      value: value,
    });
  }
}
