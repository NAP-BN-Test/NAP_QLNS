import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppModuleService } from 'src/app/services/app-module.service';
import { STATUS } from 'src/app/services/constant/app-constant';
import { ParamsKey } from 'src/app/services/constant/paramskey';

@Component({
  selector: 'app-add-update-family-relationship',
  templateUrl: './add-update-family-relationship.component.html',
  styleUrls: ['./add-update-family-relationship.component.less'],
})
export class AddUpdateFamilyRelationshipComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public mService: AppModuleService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    public dialogRef: MatDialogRef<AddUpdateFamilyRelationshipComponent>
  ) {
    this.myForm = this.formBuilder.group({
      name: [mData ? mData.name : ''],
      birthday: [mData ? mData.birthday : ''],
      gender: [mData ? mData.gender : ''],
      address: [mData ? mData.address : ''],
      workplace: [mData ? mData.workplace : ''],
      relationship: [mData ? mData.relationship : ''],
      reduce: [mData ? mData.reduce : ''],
      cmndNumber: [mData ? mData.cmndNumber : ''],
    });
  }

  ngOnInit() {}

  onSubmit(value) {
    value.birthday = this.datePipe.transform(value.birthday, 'yyyy-MM-dd');
    console.log(value);
    this.dialogRef.close({
      value: value,
    });
  }
}
