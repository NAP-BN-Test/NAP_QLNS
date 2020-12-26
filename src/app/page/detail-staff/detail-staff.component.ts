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
              departmentName: data.obj.departmentName,
            },
            idChucVu: {
              id: Number(data.obj.idChucVu),
              positionName: data.obj.positionName,
            },
            idLoaiHopDong: data.obj.idLoaiHopDong,
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
    value.idBoPhan = value.idBoPhan.id;
    value.idChucVu = value.idChucVu.id;
    console.log(value);

    this.mService
      .getApiService()
      .sendRequestUPDATE_TBL_DMNHANVIEN(value)
      .then((data) => {
        this.mService.showSnackBar(data.message);
      });
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
      { name: 'CHUYÊN NGÀNH', cell: 'chuyenNganh' },
      { name: 'SỐ TIỀN CÔNG TY', cell: 'companyCost' },
      { name: 'SỐ TIỀN CÁ NHÂN', cell: 'personCost' },
      { name: 'SỐ CHỨNG CHỈ', cell: 'soCC' },
      { name: 'NGÀY CẤP', cell: 'dateStart' },
      { name: 'NGÀY HẾT HẠN', cell: 'dateEnd' },
      { name: 'THAO TÁC', cell: 'undefined' },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: 'Xóa', color: 'accent' }],
  };

  dataExampleTrainingAfter = [
    {
      stt: 0,
      trainingCourse: 'Khóa đào tạo nghiệp vụ',
      chuyenNganh: 'Công nghệ thông tin',
      companyCost: '6000000',
      personCost: '9000000',
      soCC: 'CT38293',
      dateStart: '11-11-2020',
      dateEnd: '11-11-2022',
    },
  ];

  onLoadDataTrainingAfter() {
    this.mService.publishEvent(EVENT_PUSH.TABLE, {
      listData: this.dataExampleTrainingAfter,
      listTbData: this.listTbDataTrainingAfter,
    });
  }

  onClickAddTrainingAfter() {
    const dialogRef = this.dialog.open(AddUpdateTrainingAfterComponent, {
      width: '900px',
    });
  }

  onClickEditTrainingAfter(event) {
    const dialogRef = this.dialog.open(AddUpdateTrainingAfterComponent, {
      width: '900px',
      data: {
        trainingCourse: event.data.trainingCourse,
        chuyenNganh: event.data.chuyenNganh,
        companyCost: event.data.companyCost,
        personCost: event.data.personCost,
        soCC: event.data.soCC,
      },
    });
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

  dataExampleTrainingBefore = [
    {
      stt: 0,
      degree: 'Hoàn thành khóa đào tạo nghiệp vụ',
      major: 'Công nghệ thông tin',
      trainingPlace: 'Bắc Ninh',
      dateStart: '11-11-2020',
      dateEnd: '11-11-2022',
    },
  ];

  onLoadDataTrainingBefore() {
    this.mService.publishEvent(EVENT_PUSH.TABLE, {
      listData: this.dataExampleTrainingBefore,
      listTbData: this.listTbDataTrainingBefore,
    });
  }

  onClickAddTrainingBefore() {
    const dialogRef = this.dialog.open(AddUpdateTrainingBeforeComponent, {
      width: '900px',
    });
  }

  onClickEditTrainingBefore(event) {
    const dialogRef = this.dialog.open(AddUpdateTrainingBeforeComponent, {
      width: '900px',
      data: {
        degree: event.data.degree,
        major: event.data.major,
        trainingPlace: event.data.trainingPlace,
      },
    });
  }

  // Lịch sử công tác =================================================================

  listTbDataStaffStatus = {
    listColum: [
      { name: 'SỐ THỨ TỰ', cell: 'stt' },
      { name: 'TỪ NGÀY', cell: 'dateStart' },
      { name: 'ĐẾN NGÀY', cell: 'dateEnd' },
      { name: 'TÌNH TRẠNG', cell: 'employeeStatus' },
      { name: 'MÔ TẢ', cell: 'description' },
      { name: 'THAO TÁC', cell: 'undefined' },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: 'Xóa', color: 'accent' }],
  };

  dataExampleStaffStatus = [
    {
      stt: 0,
      description: 'Mô tả tình trạng A',
      employeeStatus: 'Tình trạng 1',
      dateStart: '11-11-2020',
      dateEnd: '11-11-2022',
    },
  ];

  onLoadDataStaffStatus() {
    this.mService.publishEvent(EVENT_PUSH.TABLE, {
      listData: this.dataExampleStaffStatus,
      listTbData: this.listTbDataStaffStatus,
    });
  }

  onClickAddStaffStatus() {
    const dialogRef = this.dialog.open(AddUpdateStaffStatusComponent, {
      width: '900px',
    });
  }

  onClickEditStaffStatus(event) {
    const dialogRef = this.dialog.open(AddUpdateStaffStatusComponent, {
      width: '900px',
      data: {
        employeeStatus: event.data.employeeStatus,
        description: event.data.description,
      },
    });
  }

  // Quản lý hợp đồng =======================================================

  listTbDataContract = {
    listColum: [
      { name: 'SỐ THỨ TỰ', cell: 'stt' },
      { name: 'SỐ HỢP ĐỒNG', cell: 'contractCode' },
      { name: 'NGÀY KÝ', cell: 'dateStart' },
      { name: 'LOẠI HỢP ĐỒNG', cell: 'contactType' },
      { name: 'MỨC LƯƠNG', cell: 'salary' },
      { name: 'TÌNH TRẠNG HỢP ĐỒNG', cell: 'contractStatus' },
      { name: 'NGÀY CHẤM DỨT', cell: 'dateEnd' },
      // { name: 'LÝ DO', cell: 'description' },
      { name: 'THAO TÁC', cell: 'undefined' },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: 'Xóa', color: 'accent' }],
  };

  dataExampleContract = [
    {
      stt: 0,
      description: 'Mô tả tình trạng A',
      employeeStatus: 'Tình trạng 1',
      dateStart: '11-11-2020',
      dateEnd: '11-11-2022',
      contractCode: 'SA8724823',
      contactType: 'Hợp đồng lao động',
      salary: '9000000',
      contractStatus: 'Còn hiệu lực',
    },
  ];

  onLoadDataContract() {
    this.mService.publishEvent(EVENT_PUSH.TABLE, {
      listData: this.dataExampleContract,
      listTbData: this.listTbDataContract,
    });
  }

  onClickAddContract() {
    const dialogRef = this.dialog.open(AddUpdateContractComponent, {
      width: '900px',
    });
  }

  onClickEditContract(event) {
    const dialogRef = this.dialog.open(AddUpdateContractComponent, {
      width: '900px',
      data: {
        contractCode: event.data.contractCode,
        salaryNumber: event.data.salary,
        status: event.data.status,
        stt: 0,
        description: 'Mô tả tình trạng A',
        decisionStatus: 'Có hiệu lực',
        contractStatus: 'Còn hiệu lực',
        // staffName: this.nameStaff,
      },
    });
  }

  onClickBtnContract(event) {}

  // Quyết định tăng lương =======================================================

  listTbDataSalaryIncrease = {
    listColum: [
      { name: 'SỐ THỨ TỰ', cell: 'stt' },
      { name: 'SỐ QUYẾT ĐỊNH', cell: 'decisionCode' },
      { name: 'NGÀY KÝ', cell: 'decisionDate' },
      { name: 'MỨC LƯƠNG', cell: 'salaryIncrease' },
      { name: 'TÌNH TRẠNG QUYẾT ĐỊNH', cell: 'decisionStatus' },
      { name: 'NGÀY DỪNG', cell: 'stopEnd' },
      // { name: 'LÝ DO', cell: 'description' },
      { name: 'THAO TÁC', cell: 'undefined' },
    ],
  };

  dataExampleSalaryIncrease = [
    {
      stt: 0,
      description: 'Mô tả tình trạng A',
      decisionStatus: 'Có hiệu lực',
      decisionDate: '11-11-2020',
      stopEnd: '11-11-2022',
      decisionCode: 'SA8724823',
      salaryIncrease: '9000000',
      contractStatus: 'Còn hiệu lực',
    },
  ];

  onLoadDataSalaryIncrease() {
    this.mService.publishEvent(EVENT_PUSH.TABLE, {
      listData: this.dataExampleSalaryIncrease,
      listTbData: this.listTbDataSalaryIncrease,
    });
  }

  onClickAddSalaryIncrease() {
    const dialogRef = this.dialog.open(
      AddUpdateDecidedIncreaseSalariesComponent,
      {
        width: '900px',
      }
    );
  }

  onClickEditSalaryIncrease(event) {
    const dialogRef = this.dialog.open(
      AddUpdateDecidedIncreaseSalariesComponent,
      {
        width: '900px',
        data: {
          decisionCode: event.data.decisionCode,
          salaryIncrease: event.data.salaryIncrease,
          status: event.data.status,
          stt: 0,
          description: 'Mô tả tình trạng A',
          decisionStatus: 'Có hiệu lực',
          contractStatus: 'Còn hiệu lực',
          // staffName: this.nameStaff,
        },
      }
    );
  }
}
