import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AddUpdateContractComponent } from 'src/app/dialogs/add-update-contract/add-update-contract.component';
import { AddUpdateDecidedIncreaseSalariesComponent } from 'src/app/dialogs/add-update-decided-increase-salaries/add-update-decided-increase-salaries.component';
import { AddUpdateFamilyRelationshipComponent } from 'src/app/dialogs/add-update-family-relationship/add-update-family-relationship.component';
import { AddUpdateStaffStatusComponent } from 'src/app/dialogs/add-update-staff-status/add-update-staff-status.component';
import { AddUpdateTrainingAfterComponent } from 'src/app/dialogs/add-update-training-after/add-update-training-after.component';
import { AddUpdateTrainingBeforeComponent } from 'src/app/dialogs/add-update-training-before/add-update-training-before.component';
import { RemoveComponent } from 'src/app/dialogs/remove/remove.component';
import { AppModuleService } from 'src/app/services/app-module.service';
import {
  BUTTON_TYPE,
  EVENT_PUSH,
  STATUS,
} from 'src/app/services/constant/app-constant';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import * as moment from 'moment';

@Component({
  selector: 'app-detail-staff',
  templateUrl: './detail-staff.component.html',
  styleUrls: ['./detail-staff.component.less'],
})
export class DetailStaffComponent implements OnInit {
  myForm: FormGroup;
  quoteID;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public mService: AppModuleService,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.spinner.show();
    this.mService.LoadAppConfig();
    let params: any = this.mService.handleActivatedRoute();
    this.quoteID = params.quoteID ? params.quoteID : '';
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

    this.mService
      .getApiService()
      .sendRequestDETAIL_TBL_DMNHANVIEN(this.quoteID)
      .then((data) => {
        if (data.status == STATUS.SUCCESS) {
          console.log(data);

          this.myForm = this.fb.group({
            address: data.obj.address,
            age: data.obj.age,
            bankName: data.obj.bankName,
            bankNumber: data.obj.bankNumber,
            bhxhSalary: data.obj.bhxhSalary,
            birthday: data.obj.birthday,
            cmndNumber: data.obj.cmndNumber,
            contactUrgent: data.obj.contactUrgent,
            contractCode: data.obj.contractCode,
            contractDateEnd: data.obj.contractDateEnd,
            degree: data.obj.degree,
            gender: data.obj.gender,
            idBoPhan: {
              id: Number(data.obj.idBoPhan),
            },
            idChucVu: {
              id: Number(data.obj.idChucVu),
            },
            idLoaiHopDong: { id: Number(data.obj.idLoaiHopDong) },
            idMayChamCong: data.obj.idMayChamCong,
            idNation: data.obj.idNation,
            permanentResidence: data.obj.permanentResidence,
            phoneNumber: data.obj.phoneNumber,
            probationaryDate: data.obj.probationaryDate,
            probationarySalary: data.obj.probationarySalary,
            signDate: data.obj.signDate,
            staffCode: data.obj.staffCode,
            staffName: data.obj.staffName,
            status: data.obj.status,
            taxCode: data.obj.taxCode,
            workingDate: data.obj.workingDate,
            workingSalary: data.obj.workingSalary,
            email: data.obj.email,
            idContract: data.obj.idContract,
            id: this.quoteID,
          });
          this.computeAge();
        }
        this.spinner.hide();
      });
  }

  // Bắt sự kiện khi đổi tabs
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    if (tabChangeEvent.index === 1) {
      this.onLoadDataFamilyRelationship();
    } else if (tabChangeEvent.index === 2) {
      this.onLoadDataTrainingAfter();
    } else if (tabChangeEvent.index === 3) {
      this.onLoadDataTrainingBefore();
    } else if (tabChangeEvent.index === 4) {
      this.onLoadDataStaffStatus();
    } else if (tabChangeEvent.index === 5) {
      this.onLoadDataContract();
    } else if (tabChangeEvent.index === 6) {
      this.onLoadDataSalaryIncrease();
    }
  };

  // Thông tin chung =========================================================

  createForm() {
    this.myForm = this.fb.group({
      address: [''],
      age: [''],
      bankName: [''],
      bankNumber: [''],
      bhxhSalary: [''],
      birthday: [''],
      cmndNumber: [''],
      contactUrgent: [''],
      contractCode: [''],
      contractDateEnd: [''],
      degree: [''],
      gender: [''],
      idBoPhan: [''],
      idChucVu: [''],
      idLoaiHopDong: [''],
      idMayChamCong: [''],
      idNation: [''],
      permanentResidence: [''],
      phoneNumber: [''],
      probationaryDate: [''],
      probationarySalary: [''],
      signDate: [''],
      staffCode: [''],
      staffName: [''],
      status: [''],
      taxCode: [''],
      workingDate: [''],
      workingSalary: [''],
      email: [''],
      idContract: null,
    });
  }

  onSubmit(value) {
    this.isEdit = false;

    value.birthday = this.datePipe.transform(value.birthday, 'yyyy-MM-dd');
    value.contractDateEnd = this.datePipe.transform(
      value.contractDateEnd,
      'yyyy-MM-dd'
    );
    value.signDate = this.datePipe.transform(value.signDate, 'yyyy-MM-dd');
    value.idBoPhan = value.idBoPhan ? value.idBoPhan.id : '';
    value.idChucVu = value.idChucVu ? value.idChucVu.id : '';
    value.idLoaiHopDong = value.idLoaiHopDong ? value.idLoaiHopDong.id : '';
    console.log(value);

    this.mService
      .getApiService()
      .sendRequestUPDATE_TBL_DMNHANVIEN(value)
      .then((data) => {
        this.mService.showSnackBar(data.message);
      });
  }

  //Tính ngày hết hạn bảo hành
  computeAge() {
    if (this.myForm.controls.birthday.value) {
      var timeDiff = Math.abs(
        Date.now() - new Date(this.myForm.controls.birthday.value).getTime()
      );
      let age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      console.log(age);
      this.myForm.controls.age.setValue(age);
    }
  }

  //Autocomplete Bộ phận
  filterDepartment: Observable<string[]>;
  listDepartment = [];

  _filterDepartment(value): string[] {
    const filterValue = value.toLowerCase();
    return this.listDepartment.filter((option: any) =>
      option.departmentName.toLowerCase().includes(filterValue)
    );
  }

  departmentDisplayFn = (value) =>
    Object.values(this.listDepartment).find(
      (department) => department.id == value.id
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
    Object.values(this.listRole).find((role) => role.id == value.id)
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

  // Quan hệ gia đình ========================================================
  listTbDataFamilyRelationship = {
    listColum: [
      { name: 'SỐ THỨ TỰ', cell: 'stt' },
      { name: 'HỌ TÊN', cell: 'name' },
      { name: 'NGÀY SINH', cell: 'birthday' },
      { name: 'GIỚI TÍNH', cell: 'gender' },
      { name: 'SỐ CMT', cell: 'cmndNumber' },
      { name: 'NƠI Ở', cell: 'address' },
      { name: 'NƠI LÀM VIỆC', cell: 'workplace' },
      { name: 'QUAN HỆ', cell: 'relationship' },
      { name: 'GIẢM TRỪ', cell: 'reduce' },
      { name: 'THAO TÁC', cell: 'undefined' },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: 'Xóa', color: 'accent' }],
  };

  onLoadDataFamilyRelationship() {
    this.mService
      .getApiService()
      .sendRequestGET_LIST_TBL_DMGIADINH(this.quoteID)
      .then((data) => {
        console.log(data);
        if (data.status == STATUS.SUCCESS) {
          this.mService.publishEvent(EVENT_PUSH.TABLE, {
            listData: data.array,
            listTbData: this.listTbDataFamilyRelationship,
          });
        }
      });
  }

  onClickAddFamilyRelationship() {
    const dialogRef = this.dialog.open(AddUpdateFamilyRelationshipComponent, {
      width: '900px',
      maxHeight: '700px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        res.value['idNhanVien'] = this.quoteID;
        this.mService
          .getApiService()
          .sendRequestADD_TBL_DMGIADINH(res.value)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
              this.onLoadDataFamilyRelationship();
            }
          });
      }
    });
  }

  onClickEditFamilyRelationship(event) {
    const dialogRef = this.dialog.open(AddUpdateFamilyRelationshipComponent, {
      width: '900px',
      height: '700px',
      data: {
        name: event.data.name,
        birthday: event.data.birthday,
        gender: event.data.gender,
        cmndNumber: event.data.cmndNumber,
        address: event.data.address,
        workplace: event.data.workplace,
        relationship: event.data.relationship,
        reduce: event.data.reduce,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        res.value['id'] = event.data.id;
        this.mService
          .getApiService()
          .sendRequestUPDATE_TBL_DMGIADINH(res.value)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
              this.onLoadDataFamilyRelationship();
            }
          });
      }
    });
  }

  onClickBtnFamilyRelationship(event) {
    if (event.btnType == BUTTON_TYPE.DELETE) {
      const dialogRef = this.dialog.open(RemoveComponent, {
        width: '500px',
      });
      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          this.mService
            .getApiService()
            .sendRequestDELETE_TBL_DMGIADINH(event.data)
            .then((data) => {
              this.mService.showSnackBar(data.message);
              if (data.status == STATUS.SUCCESS) {
                this.onLoadDataFamilyRelationship();
              }
            });
        }
      });
    }
  }

  // Quản lý đào tạo sau khi đến công ty ================================
  listTbDataTrainingAfter = {
    listColum: [
      { name: 'SỐ THỨ TỰ', cell: 'stt' },
      { name: 'KHÓA ĐÀO TẠO', cell: 'trainingCourse' },
      { name: 'CHUYÊN NGÀNH', cell: 'majors' },
      { name: 'SỐ TIỀN CÔNG TY', cell: 'companyCost' },
      { name: 'SỐ TIỀN CÁ NHÂN', cell: 'staffCost' },
      { name: 'SỐ CHỨNG CHỈ', cell: 'numberCertificates' },
      { name: 'NGÀY CẤP', cell: 'dateStart' },
      { name: 'NGÀY HẾT HẠN', cell: 'dateEnd' },
      { name: 'THAO TÁC', cell: 'undefined' },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: 'Xóa', color: 'accent' }],
  };

  onLoadDataTrainingAfter() {
    this.mService
      .getApiService()
      .sendRequestGET_LIST_TBL_TRAINING_AFTER(this.quoteID)
      .then((data) => {
        console.log(data);
        if (data.status == STATUS.SUCCESS) {
          this.mService.publishEvent(EVENT_PUSH.TABLE, {
            listData: data.array,
            listTbData: this.listTbDataTrainingAfter,
          });
        }
      });
  }

  onClickAddTrainingAfter() {
    const dialogRef = this.dialog.open(AddUpdateTrainingAfterComponent, {
      width: '900px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        res.value['idNhanVien'] = this.quoteID;
        console.log(res.value);

        this.mService
          .getApiService()
          .sendRequestADD_TBL_TRAINING_AFTER(res.value)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
              this.onLoadDataTrainingAfter();
            }
          });
      }
    });
  }

  onClickEditTrainingAfter(event) {    
    const dialogRef = this.dialog.open(AddUpdateTrainingAfterComponent, {
      width: '900px',
      data: {
        trainingCourse: event.data.trainingCourse,
        majors: event.data.majors,
        companyCost: event.data.companyCost,
        staffCost: event.data.staffCost,
        numberCertificates: event.data.numberCertificates,
        dateStart: event.data.dateStart,
        dateEnd: event.data.dateEnd,
        formTraining: event.data.formTraining,
        expirationDate: event.data.expirationDate,
        rangeDate: event.data.rangeDate,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        res.value['id'] = event.data.id;
        this.mService
          .getApiService()
          .sendRequestUPDATE_TBL_TRAINING_AFTER(res.value)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
              this.onLoadDataTrainingAfter();
            }
          });
      }
    });
  }

  onClickBtnTrainingAfter(event) {
    if (event.btnType == BUTTON_TYPE.DELETE) {
      const dialogRef = this.dialog.open(RemoveComponent, {
        width: '500px',
      });
      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          this.mService
            .getApiService()
            .sendRequestDELETE_TBL_TRAINING_AFTER(event.data)
            .then((data) => {
              this.mService.showSnackBar(data.message);
              if (data.status == STATUS.SUCCESS) {
                this.onLoadDataTrainingAfter();
              }
            });
        }
      });
    }
  }

  // Quản lý đào tạo trước khi đến công ty ===========================================

  listTbDataTrainingBefore = {
    listColum: [
      { name: 'SỐ THỨ TỰ', cell: 'stt' },
      { name: 'NGÀY BẮT ĐẦU', cell: 'dateStart' },
      { name: 'NGÀY KẾT THÚC', cell: 'dateEnd' },
      { name: 'NƠI ĐÀO TẠO', cell: 'trainingPlace' },
      { name: 'CHUYÊN NGÀNH', cell: 'major' },
      { name: 'BẰNG CẤP', cell: 'degree' },
      { name: 'THAO TÁC', cell: 'undefined' },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: 'Xóa', color: 'accent' }],
  };

  onLoadDataTrainingBefore() {
    this.mService
      .getApiService()
      .sendRequestGET_LIST_TBL_PRE_TRAINING(this.quoteID)
      .then((data) => {
        console.log(data);
        if (data.status == STATUS.SUCCESS) {
          this.mService.publishEvent(EVENT_PUSH.TABLE, {
            listData: data.array,
            listTbData: this.listTbDataTrainingBefore,
          });
        }
      });
  }

  onClickAddTrainingBefore() {
    const dialogRef = this.dialog.open(AddUpdateTrainingBeforeComponent, {
      width: '900px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        res.value['idNhanVien'] = this.quoteID;
        this.mService
          .getApiService()
          .sendRequestADD_TBL_PRE_TRAINING(res.value)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
              this.onLoadDataTrainingBefore();
            }
          });
      }
    });
  }

  onClickEditTrainingBefore(event) {
    const dialogRef = this.dialog.open(AddUpdateTrainingBeforeComponent, {
      width: '900px',
      data: {
        degree: event.data.degree,
        major: event.data.major,
        trainingPlace: event.data.trainingPlace,
        dateStart: event.data.dateStart,
        dateEnd: event.data.dateEnd,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        res.value['id'] = event.data.id;
        this.mService
          .getApiService()
          .sendRequestUPDATE_TBL_PRE_TRAINING(res.value)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
              this.onLoadDataTrainingBefore();
            }
          });
      }
    });
  }

  onClickBtnTrainingBefore(event) {
    if (event.btnType == BUTTON_TYPE.DELETE) {
      const dialogRef = this.dialog.open(RemoveComponent, {
        width: '500px',
      });
      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          this.mService
            .getApiService()
            .sendRequestDELETE_TBL_PRE_TRAINING(event.data)
            .then((data) => {
              this.mService.showSnackBar(data.message);
              if (data.status == STATUS.SUCCESS) {
                this.onLoadDataTrainingBefore();
              }
            });
        }
      });
    }
  }

  // Lịch sử công tác =================================================================

  listTbDataStaffStatus = {
    listColum: [
      { name: 'SỐ THỨ TỰ', cell: 'stt' },
      { name: 'TỪ NGÀY', cell: 'dateStart' },
      { name: 'ĐẾN NGÀY', cell: 'dateEnd' },
      { name: 'TÌNH TRẠNG', cell: 'status' },
      { name: 'MÔ TẢ', cell: 'describe' },
      { name: 'THAO TÁC', cell: 'undefined' },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: 'Xóa', color: 'accent' }],
  };

  onLoadDataStaffStatus() {
    this.mService
      .getApiService()
      .sendRequestGET_LIST_TBL_WORK_HISTORY(this.quoteID)
      .then((data) => {
        console.log(data);
        if (data.status == STATUS.SUCCESS) {
          this.mService.publishEvent(EVENT_PUSH.TABLE, {
            listData: data.array,
            listTbData: this.listTbDataStaffStatus,
          });
        }
      });
  }

  onClickAddStaffStatus() {
    const dialogRef = this.dialog.open(AddUpdateStaffStatusComponent, {
      width: '900px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        res.value['idNhanVien'] = this.quoteID;
        this.mService
          .getApiService()
          .sendRequestADD_TBL_WORK_HISTORY(res.value)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
              this.onLoadDataStaffStatus();
            }
          });
      }
    });
  }

  onClickEditStaffStatus(event) {
    const dialogRef = this.dialog.open(AddUpdateStaffStatusComponent, {
      width: '900px',
      data: {
        describe: event.data.describe,
        status: event.data.status,
        dateStart: event.data.dateStart,
        dateEnd: event.data.dateEnd,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        res.value['id'] = event.data.id;
        this.mService
          .getApiService()
          .sendRequestUPDATE_TBL_WORK_HISTORY(res.value)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
              this.onLoadDataStaffStatus();
            }
          });
      }
    });
  }

  onClickBtnStaffStatus(event) {
    if (event.btnType == BUTTON_TYPE.DELETE) {
      const dialogRef = this.dialog.open(RemoveComponent, {
        width: '500px',
      });
      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          this.mService
            .getApiService()
            .sendRequestDELETE_TBL_WORK_HISTORY(event.data)
            .then((data) => {
              this.mService.showSnackBar(data.message);
              if (data.status == STATUS.SUCCESS) {
                this.onLoadDataStaffStatus();
              }
            });
        }
      });
    }
  }

  // Quản lý hợp đồng =======================================================

  listTbDataContract = {
    listColum: [
      { name: 'SỐ THỨ TỰ', cell: 'stt' },
      { name: 'SỐ HỢP ĐỒNG', cell: 'contractCode' },
      { name: 'NGÀY KÝ', cell: 'signDate' },
      { name: 'LOẠI HỢP ĐỒNG', cell: 'loaiHopDong' },
      { name: 'MỨC LƯƠNG', cell: 'salaryNumber' },
      { name: 'TÌNH TRẠNG HỢP ĐỒNG', cell: 'status' },
      { name: 'NGÀY CHẤM DỨT', cell: 'contractDateEnd' },
      { name: 'THAO TÁC', cell: 'undefined' },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: 'Xóa', color: 'accent' }],
  };

  onLoadDataContract() {
    this.mService
      .getApiService()
      .sendRequestGET_LIST_HOPDONG_NHANSU_DETAIL(this.quoteID)
      .then((data) => {
        console.log(data);
        if (data.status == STATUS.SUCCESS) {
          this.mService.publishEvent(EVENT_PUSH.TABLE, {
            listData: data.array,
            listTbData: this.listTbDataContract,
          });
        }
      });
  }

  onClickAddContract() {
    const dialogRef = this.dialog.open(AddUpdateContractComponent, {
      width: '900px',
      data: {
        idNhanVien: this.quoteID,
        isCreate: true,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        res.value['idNhanVien'] = this.quoteID;
        console.log(res.value);

        this.mService
          .getApiService()
          .sendRequestADD_TBL_HOPDONG_NHANSU(res.value)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
              this.onLoadDataContract();
            }
          });
      }
    });
  }

  onClickEditContract(event) {
    const dialogRef = this.dialog.open(AddUpdateContractComponent, {
      width: '900px',
      data: {
        contractCode: event.data.contractCode,
        idLoaiHopDong: event.data.idLoaiHopDong,
        signDate: event.data.signDate,
        salaryNumber: event.data.salaryNumber,
        contractDateEnd: event.data.contractDateEnd,
        status: event.data.status,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        res.value['id'] = event.data.id;
        console.log(res.value);

        this.mService
          .getApiService()
          .sendRequestUPDATE_TBL_HOPDONG_NHANSU(res.value)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
              this.onLoadDataContract();
            }
          });
      }
    });
  }

  onClickBtnContract(event) {
    if (event.btnType == BUTTON_TYPE.DELETE) {
      const dialogRef = this.dialog.open(RemoveComponent, {
        width: '500px',
      });
      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          this.mService
            .getApiService()
            .sendRequestDELETE_TBL_HOPDONG_NHANSU(event.data)
            .then((data) => {
              this.mService.showSnackBar(data.message);
              if (data.status == STATUS.SUCCESS) {
                this.onLoadDataContract();
              }
            });
        }
      });
    }
  }

  // Quyết định tăng lương =======================================================

  listTbDataSalaryIncrease = {
    listColum: [
      { name: 'SỐ THỨ TỰ', cell: 'stt' },
      { name: 'SỐ QUYẾT ĐỊNH', cell: 'decisionCode' },
      { name: 'NGÀY KÝ', cell: 'decisionDate' },
      { name: 'MỨC LƯƠNG', cell: 'salaryIncrease' },
      { name: 'TÌNH TRẠNG QUYẾT ĐỊNH', cell: 'status' },
      { name: 'NGÀY DỪNG', cell: 'stopDate' },
      { name: 'THAO TÁC', cell: 'undefined' },
    ],

    listButton: [{ id: BUTTON_TYPE.DELETE, name: 'Xóa', color: 'accent' }],
  };

  onLoadDataSalaryIncrease() {
    this.mService
      .getApiService()
      .sendRequestGET_DETAIL_TBL_QUYETDINH_TANGLUONG(this.quoteID)
      .then((data) => {
        console.log(data);
        if (data.status == STATUS.SUCCESS) {
          this.mService.publishEvent(EVENT_PUSH.TABLE, {
            listData: data.array,
            listTbData: this.listTbDataSalaryIncrease,
          });
        }
      });
  }

  onClickAddSalaryIncrease() {
    const dialogRef = this.dialog.open(
      AddUpdateDecidedIncreaseSalariesComponent,
      {
        width: '900px',
        data: {
          idNhanVien: this.quoteID,
          isCreate: true,
        },
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        res.value['idNhanVien'] = this.quoteID;
        console.log(res.value);

        this.mService
          .getApiService()
          .sendRequestADD_TBL_QUYETDINH_TANGLUONG(res.value)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
              this.onLoadDataSalaryIncrease();
            }
          });
      }
    });
  }

  onClickEditSalaryIncrease(event) {
    const dialogRef = this.dialog.open(
      AddUpdateDecidedIncreaseSalariesComponent,
      {
        width: '900px',
        data: {
          idNhanVien: this.quoteID,
          decisionCode: event.data.decisionCode,
          salaryIncrease: event.data.salaryIncrease,
          status: event.data.status,
          description: event.data.description,
          contractStatus: event.data.contractStatus,
          stopDate: event.data.stopDate,
          decisionDate: event.data.decisionDate,
        },
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        res.value['id'] = event.data.id;
        console.log(res.value);

        this.mService
          .getApiService()
          .sendRequestUPDATE_TBL_QUYETDINH_TANGLUONG(res.value)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
              this.onLoadDataSalaryIncrease();
            }
          });
      }
    });
  }

  onClickBtnSalaryIncrease(event) {
    if (event.btnType == BUTTON_TYPE.DELETE) {
      const dialogRef = this.dialog.open(RemoveComponent, {
        width: '500px',
      });
      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          this.mService
            .getApiService()
            .sendRequestDELETE_TBL_QUYETDINH_TANGLUONG(event.data)
            .then((data) => {
              this.mService.showSnackBar(data.message);
              if (data.status == STATUS.SUCCESS) {
                this.onLoadDataSalaryIncrease();
              }
            });
        }
      });
    }
  }
}
