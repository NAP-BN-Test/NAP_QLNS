import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-add-update-contract',
  templateUrl: './add-update-contract.component.html',
  styleUrls: ['./add-update-contract.component.less'],
})
export class AddUpdateContractComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public mService: AppModuleService,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    public dialogRef: MatDialogRef<AddUpdateContractComponent>
  ) {
    this.myForm = this.formBuilder.group({
      contractCode: [mData ? mData.contractCode : ''],
      contractType: [mData ? mData.contractType : ''],
      contractDateStart: [mData ? mData.contractDateStart : ''],
      salaryNumber: [mData ? mData.salaryNumber : ''],
      contractDateEnd: [mData ? mData.contractDateEnd : ''],
      reason: [mData ? mData.reason : ''],
      status: [mData ? mData.status : ''],
      staffCode: [''],
      staffName: [mData ? mData.staffName : ''],
    });
  }

  ngOnInit() {}

  onClickOk(event) {
    this.dialogRef.close({
      contractCode: this.myForm.value.contractCode,
      contractType: this.myForm.value.contractType,
      contractDateStart: this.myForm.value.contractDateStart,
      salaryNumber: this.myForm.value.salaryNumber,
      contractDateEnd: this.myForm.value.contractDateEnd,
      reason: this.myForm.value.reason,
      status: this.myForm.value.status,
    });
  }
}
