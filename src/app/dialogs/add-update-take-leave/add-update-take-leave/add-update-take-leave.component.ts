import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-add-update-take-leave',
  templateUrl: './add-update-take-leave.component.html',
  styleUrls: ['./add-update-take-leave.component.less'],
})
export class AddUpdateTakeLeaveComponent implements OnInit {
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
    private datePipe: DatePipe,
    public mService: AppModuleService,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    public dialogRef: MatDialogRef<AddUpdateTakeLeaveComponent>
  ) {
    this.myForm = this.formBuilder.group({
      idLoaiChamCong: [mData ? mData.idLoaiChamCong : ''],
      dateStart: [mData ? mData.dateStart : ''],
      dateEnd: [mData ? mData.dateEnd : ''],
      idNhanVien: [mData ? mData.idNhanVien : ''],
    });
  }

  async ngOnInit() {
    await this.mService
      .getApiService()
      .sendRequestGET_LIST_NAME_TBL_LOAICHAMCONG('timekeeping')
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
      });

    await this.mService
      .getApiService()
      .sendRequestGET_LIST_NAME_TBL_DMNHANVIEN()
      .then((data) => {
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
      });

    if (this.mData) {
      this.myForm.controls.idLoaiChamCong.setValue({
        id: Number(this.mData.idLoaiChamCong),
      });
      this.myForm.controls.idNhanVien.setValue({
        id: Number(this.mData.idNhanVien),
      });
    }
  }

  onSubmit(value) {
    value.idNhanVien = value.idNhanVien.id;
    value.idLoaiChamCong = value.idLoaiChamCong.id;

    value.dateStart = this.datePipe.transform(value.dateStart, 'yyyy-MM-dd');
    value.dateEnd = this.datePipe.transform(value.dateEnd, 'yyyy-MM-dd');
    this.dialogRef.close({
      value: value,
    });
  }
}
