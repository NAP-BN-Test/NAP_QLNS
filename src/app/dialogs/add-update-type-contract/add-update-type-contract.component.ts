import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-add-update-type-contract',
  templateUrl: './add-update-type-contract.component.html',
  styleUrls: ['./add-update-type-contract.component.less'],
})
export class AddUpdateTypeContractComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public mService: AppModuleService,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    public dialogRef: MatDialogRef<AddUpdateTypeContractComponent>
  ) {
    this.myForm = this.formBuilder.group({
      maLoaiHD: [mData ? mData.maLoaiHD : ''],
      tenLoaiHD: [mData ? mData.tenLoaiHD : ''],
    });
  }

  ngOnInit() {}

  onSubmit(value) {
    console.log(value);

    this.dialogRef.close({
      maLoaiHD: value.maLoaiHD,
      tenLoaiHD: value.tenLoaiHD,
    });
  }
}
