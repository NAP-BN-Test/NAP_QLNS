import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-add-update-employee-',
  templateUrl: './add-update-employee-status.component.html',
  styleUrls: ['./add-update-employee-status.component.less'],
})
export class AddUpdateEmployeeStatusComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public mService: AppModuleService,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    public dialogRef: MatDialogRef<AddUpdateEmployeeStatusComponent>
  ) {
    this.myForm = this.formBuilder.group({
      statusName: [mData ? mData.statusName : ''],
      description: [mData ? mData.description : ''],
      statusCode: [mData ? mData.statusCode : ''],
    });
  }

  ngOnInit() {}

  onSubmit(value) {
    console.log(value);

    this.dialogRef.close({
      statusName: value.statusName,
      description: value.description,
      statusCode: value.statusCode,
    });
  }
}
