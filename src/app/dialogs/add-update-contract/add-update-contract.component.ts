import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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

  async ngOnInit() {
    await this.mService
      .getApiService()
      .sendRequestGET_LIST_NAME_TBL_LOAIHOPDONG()
      .then((data) => {
        this.listTypeContract = data.array;
        this.filterTypeContract = this.myForm.controls.idLoaiHopDong.valueChanges.pipe(
          startWith(''),
          map((value) =>
            typeof value === 'string' || value === null
              ? value
              : value.idLoaiHopDong
          ),
          map((name: string | null) =>
            name
              ? this._filterTypeContract(name)
              : this.listTypeContract.slice()
          )
        );
      });

    if (this.mData) {
      this.myForm.controls.idLoaiHopDong.setValue({
        id: Number(this.mData.idLoaiHopDong),
      });
    }
  }

  onSubmit(value) {
    value.signDate = value.signDate
      ? this.datePipe.transform(value.signDate, 'yyyy-MM-dd')
      : null;
    value.contractDateEnd = value.contractDateEnd
      ? this.datePipe.transform(value.contractDateEnd, 'yyyy-MM-dd')
      : null;
    value.idLoaiHopDong = value.idLoaiHopDong.id;
    this.dialogRef.close({
      value: value,
    });
  }

  //Autocomplete Loại hợp đồng
  filterTypeContract: Observable<string[]>;
  listTypeContract = [];

  _filterTypeContract(value): string[] {
    const filterValue = value.toLowerCase();
    return this.listTypeContract.filter((option: any) =>
      option.tenLoaiHD.toLowerCase().includes(filterValue)
    );
  }

  typeContractDisplayFn = (value) =>
    Object.values(this.listTypeContract).find(
      (TypeContract) => TypeContract.id === value.id
    )?.tenLoaiHD;
}
