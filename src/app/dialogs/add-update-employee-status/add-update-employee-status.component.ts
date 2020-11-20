import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-add-update-employee-status',
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
      nameStatus: [mData ? mData.nameStatus : ''],
      description: [mData ? mData.description : ''],
      codeStatus: [mData ? mData.codeStatus : ''],
    });
  }

  ngOnInit() {}

  onClickOk(event) {
    this.dialogRef.close({
      nameStatus: this.myForm.value.nameStatus,
      description: this.myForm.value.description,
      codeStatus: this.myForm.value.codeStatus,
    });
  }
}
