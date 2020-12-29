import { DatePipe } from '@angular/common';
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
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    public dialogRef: MatDialogRef<AddUpdateContractComponent>
  ) {
    this.myForm = this.formBuilder.group({
      contractCode: [mData ? mData.contractCode : ''],
      idLoaiHopDong: [mData ? mData.idLoaiHopDong : ''],
      signDate: [mData ? mData.signDate : null],
      salaryNumber: [mData ? mData.salaryNumber : ''],
      contractDateEnd: [mData ? mData.contractDateEnd : null],
      status: [mData ? mData.status : ''],
    });
  }

  ngOnInit() {}

  onSubmit(value) {
    value.signDate = value.signDate
      ? this.datePipe.transform(value.signDate, 'yyyy-MM-dd')
      : null;
    value.contractDateEnd = value.contractDateEnd
      ? this.datePipe.transform(value.contractDateEnd, 'yyyy-MM-dd')
      : null;
    this.dialogRef.close({
      value: value,
    });
  }
}
