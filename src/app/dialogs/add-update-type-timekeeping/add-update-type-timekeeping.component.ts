import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-add-update-type-timekeeping',
  templateUrl: './add-update-type-timekeeping.component.html',
  styleUrls: ['./add-update-type-timekeeping.component.less'],
})
export class AddUpdateTypeTimekeepingComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public mService: AppModuleService,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    public dialogRef: MatDialogRef<AddUpdateTypeTimekeepingComponent>
  ) {
    this.myForm = this.formBuilder.group({
      name: [mData ? mData.name : ''],
      description: [mData ? mData.description : ''],
      code: [mData ? mData.code : ''],
      type: mData.type,
    });
  }

  ngOnInit() {}

  onSubmit(value) {
    console.log(value);

    this.dialogRef.close({
      name: value.name,
      description: value.description,
      code: value.code,
    });
  }
}
