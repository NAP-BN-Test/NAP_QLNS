import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-add-update-holidays',
  templateUrl: './add-update-holidays.component.html',
  styleUrls: ['./add-update-holidays.component.less'],
})
export class AddUpdateHolidaysComponent implements OnInit {
  myForm: FormGroup;

  //Autocomplete loại nghỉ lễ, chấm công
  filterTypeHT: Observable<string[]>;
  listTypeHT = [];

  _filterTypeHT(value): string[] {
    const filterValue = value.toLowerCase();
    return this.listTypeHT.filter((option: any) =>
      option.idLoaiChamCong.toLowerCase().includes(filterValue)
    );
  }

  typeHTDisplayFn = (value) =>
    Object.values(this.listTypeHT).find((TypeHT) => TypeHT.id === value.id)
      ?.name;

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    public mService: AppModuleService,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    public dialogRef: MatDialogRef<AddUpdateHolidaysComponent>
  ) {
    this.myForm = this.formBuilder.group({
      idLoaiChamCong: [mData ? mData.idLoaiChamCong : ''],
      dateStartHoliday: [mData ? mData.dateStartHoliday : ''],
      dateEndHoliday: [mData ? mData.dateEndHoliday : ''],
    });
  }

  ngOnInit() {
    this.mService
      .getApiService()
      .sendRequestGET_LIST_NAME_TBL_LOAICHAMCONG('holiday')
      .then((data) => {
        console.log(data);

        this.listTypeHT = data.array;
        this.filterTypeHT = this.myForm.controls.idLoaiChamCong.valueChanges.pipe(
          startWith(''),
          map((value) =>
            typeof value === 'string' || value === null
              ? value
              : value.idLoaiChamCong
          ),
          map((name: string | null) =>
            name ? this._filterTypeHT(name) : this.listTypeHT.slice()
          )
        );
        if (this.mData) {
          this.myForm.controls.idLoaiChamCong.setValue({
            id: Number(this.mData.idLoaiChamCong),
          });
        }
      });
  }

  onSubmit(value) {
    value.dateStartHoliday = this.datePipe.transform(
      value.dateStartHoliday,
      'yyyy-MM-dd'
    );
    value.dateEndHoliday = this.datePipe.transform(
      value.dateEndHoliday,
      'yyyy-MM-dd'
    );
    console.log(value);
    this.dialogRef.close({
      value: value,
    });
  }
}
