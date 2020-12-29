import { DatePipe } from '@angular/common';
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
    private datePipe: DatePipe,
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

  onSubmit(value) {
    value.dateStart = this.datePipe.transform(value.dateStart, 'yyyy-MM-dd');
    value.dateEnd = this.datePipe.transform(value.dateEnd, 'yyyy-MM-dd');
    console.log(value);

    this.dialogRef.close({
      value: value,
    });
  }
}
