import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-add-update-staff',
  templateUrl: './add-update-staff.component.html',
  styleUrls: ['./add-update-staff.component.less'],
})
export class AddUpdateStaffComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    public mService: AppModuleService,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    public dialogRef: MatDialogRef<AddUpdateStaffComponent>
  ) {
    this.myForm = this.formBuilder.group({
      staffCode: [mData ? mData.staffCode : ''],
      staffName: [mData ? mData.staffName : ''],
      cmndNumber: [mData ? mData.cmndNumber : ''],
      address: [mData ? mData.address : ''],
      idNation: [mData ? mData.idNation : ''],
      phoneNumber: [mData ? mData.phoneNumber : ''],
      gender: [mData ? mData.gender : ''],
      idBoPhan: [mData ? mData.idBoPhan : ''],
      idChucVu: [mData ? mData.idChucVu : ''],
      taxCode: [mData ? mData.taxCode : ''],
      bankNumber: [mData ? mData.bankNumber : ''],
      bankName: [mData ? mData.bankName : ''],
      birthday: [mData ? mData.birthday : null],
      degree: [mData ? mData.degree : ''],
      permanentResidence: [mData ? mData.permanentResidence : ''],
      probationaryDate: [mData ? mData.probationaryDate : null],
      probationarySalary: [mData ? mData.probationarySalary : ''],
      workingDate: [mData ? mData.workingDate : null],
      workingSalary: [mData ? mData.workingSalary : ''],
      bhxhSalary: [mData ? mData.bhxhSalary : ''],
      contactUrgent: [mData ? mData.contactUrgent : ''],
      idMayChamCong: [mData ? mData.idMayChamCong : ''],
      email: [mData ? mData.email : ''],
      age: [mData ? mData.age : ''],
      contractCode: [mData ? mData.contractCode : ''],
      idLoaiHopDong: [mData ? mData.idLoaiHopDong : ''],
      contractDateEnd: [mData ? mData.contractDateEnd : null],
      status: [mData ? mData.status : ''],
      signDate: [mData ? mData.signDate : ''],
    });
  }

  ngOnInit() {
    this.mService
      .getApiService()
      .sendRequestGET_LIST_NAME_TBL_DM_BOPHAN()
      .then((data) => {
        this.listDepartment = data.array;
        this.filterDepartment = this.myForm.controls.idBoPhan.valueChanges.pipe(
          startWith(''),
          map((value) =>
            typeof value === 'string' || value === null ? value : value.idBoPhan
          ),
          map((name: string | null) =>
            name ? this._filterDepartment(name) : this.listDepartment.slice()
          )
        );
      });

    this.mService
      .getApiService()
      .sendRequestGET_LIST_NAME_TBL_DMCHUCVU()
      .then((data) => {
        console.log(data);

        this.listRole = data.array;
        this.filterRole = this.myForm.controls.idChucVu.valueChanges.pipe(
          startWith(''),
          map((value) =>
            typeof value === 'string' || value === null ? value : value.idChucVu
          ),
          map((name: string | null) =>
            name ? this._filterRole(name) : this.listRole.slice()
          )
        );
      });

    this.mService
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
  }

  onSubmit(value) {
    value.birthday = this.datePipe.transform(value.birthday, 'yyyy-MM-dd');
    value.contractDateEnd = this.datePipe.transform(
      value.contractDateEnd,
      'yyyy-MM-dd'
    );
    value.signDate = this.datePipe.transform(value.signDate, 'yyyy-MM-dd');
    value.idBoPhan = value.idBoPhan.id;
    value.idChucVu = value.idChucVu.id;

    this.dialogRef.close({
      value: value,
    });
  }

  //Autocomplete Bộ phận
  filterDepartment: Observable<string[]>;
  listDepartment = [];

  _filterDepartment(value): string[] {
    const filterValue = value.toLowerCase();
    return this.listDepartment.filter((option: any) =>
      option.idPhongBan.toLowerCase().includes(filterValue)
    );
  }

  departmentDisplayFn = (value) =>
    Object.values(this.listDepartment).find(
      (department) => department.id === value.id
    )?.departmentName;

  //Autocomplete Chức vụ
  filterRole: Observable<string[]>;
  listRole = [];

  _filterRole(value): string[] {
    const filterValue = value.toLowerCase();
    return this.listRole.filter((option: any) =>
      option.positionName.toLowerCase().includes(filterValue)
    );
  }

  roleDisplayFn = (value) =>
    Object.values(this.listRole).find((role) => role.id === value.id)
      ?.positionName;

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
