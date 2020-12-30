import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-add-update-decided-increase-salaries',
  templateUrl: './add-update-decided-increase-salaries.component.html',
  styleUrls: ['./add-update-decided-increase-salaries.component.less'],
})
export class AddUpdateDecidedIncreaseSalariesComponent implements OnInit {
  myForm: FormGroup;

  //Autocomplete Nhân viên
  filterStaff: Observable<string[]>;
  listStaff = [];

  _filterStaff(value): string[] {
    const filterValue = value.toLowerCase();
    return this.listStaff.filter((option: any) =>
      option.staffName.toLowerCase().includes(filterValue)
    );
  }

  staffDisplayFn = (value) =>
    Object.values(this.listStaff).find((staff) => staff.id === value.id)
      ?.staffName;

  constructor(
    private formBuilder: FormBuilder,
    public mService: AppModuleService,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<AddUpdateDecidedIncreaseSalariesComponent>
  ) {
    this.myForm = this.formBuilder.group({
      idNhanVien: [mData ? mData.idNhanVien : ''],
      decisionCode: [mData ? mData.decisionCode : ''],
      decisionDate: [mData ? mData.decisionDate : ''],
      salaryIncrease: [mData ? mData.salaryIncrease : ''],
      status: [mData ? mData.status : ''],
      stopDate: [mData ? mData.stopDate : ''],
      stopReason: [mData ? mData.stopReason : ''],
    });
  }

  ngOnInit() {
    this.mService
      .getApiService()
      .sendRequestGET_LIST_NAME_TBL_DMNHANVIEN()
      .then((data) => {
        console.log(data);

        this.listStaff = data.array;
        this.filterStaff = this.myForm.controls.idNhanVien.valueChanges.pipe(
          startWith(''),
          map((value) =>
            typeof value === 'string' || value === null
              ? value
              : value.idNhanVien
          ),
          map((name: string | null) =>
            name ? this._filterStaff(name) : this.listStaff.slice()
          )
        );
        if (this.mData) {
          this.myForm.controls.idNhanVien.setValue({
            id: Number(this.mData.idNhanVien),
          });
        }
      });
  }

  onSubmit(value) {
    value.idNhanVien = value.idNhanVien.id;
    value.stopDate = value.stopDate
      ? this.datePipe.transform(value.stopDate, 'yyyy-MM-dd')
      : null;
    value.decisionDate = value.decisionDate
      ? this.datePipe.transform(value.decisionDate, 'yyyy-MM-dd')
      : null;
    this.dialogRef.close({
      value: value,
    });
  }
}
