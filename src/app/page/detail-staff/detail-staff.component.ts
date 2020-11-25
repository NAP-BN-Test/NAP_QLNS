import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AddUpdateDecidedIncreaseSalariesComponent } from 'src/app/dialogs/add-update-decided-increase-salaries/add-update-decided-increase-salaries.component';
import { AddUpdateFamilyRelationshipComponent } from 'src/app/dialogs/add-update-family-relationship/add-update-family-relationship.component';
import { AddUpdateStaffStatusComponent } from 'src/app/dialogs/add-update-staff-status/add-update-staff-status.component';
import { AddUpdateTrainingAfterComponent } from 'src/app/dialogs/add-update-training-after/add-update-training-after.component';
import { AddUpdateTrainingBeforeComponent } from 'src/app/dialogs/add-update-training-before/add-update-training-before.component';
import { AppModuleService } from 'src/app/services/app-module.service';
import {
  BUTTON_TYPE,
  EVENT_PUSH,
} from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-detail-staff',
  templateUrl: './detail-staff.component.html',
  styleUrls: ['./detail-staff.component.less'],
})
export class DetailStaffComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public mService: AppModuleService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

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
      codeStaff: [''],
      timekeeperCode: [''],
      personalTaxCode: [''],
      staffName: [''],
      phone: [''],
      birthday: [''],
      email: [''],
      gender: [''],
      stkNH: [''],
      departmentName: [''],
      homeTown: [''],
      currentResidence: [''],
      permanentResidence: [''],
      age: [''],
      bank: [''],
      position: [''],
    });
  }

  onLoadDataDetail() {}

  onClickClear() {
    this.myForm.controls.tsName.setValue('');
    this.myForm.controls.amount.setValue('');
    this.myForm.controls.typeAssets.setValue('');
    this.myForm.controls.cost.setValue('');
    this.myForm.controls.producer.setValue('');
    this.myForm.controls.producerYear.setValue('');
    this.myForm.controls.nuocSanXuat.setValue('');
    this.myForm.controls.bhThang.setValue('');
    this.myForm.controls.condition.setValue('');
  }

  onClickSave() {
    // this.dataCreate.push({
    //   stt: this.dataCreate.length + 1,
    //   tsName: this.myForm.value.tsName,
    //   typeAssetsName: this.myForm.value.typeAssetsName,
    //   tsCode: this.myForm.value.tsCode,
    //   producer: this.myForm.value.producer,
    //   producerYear: this.myForm.value.producerYear,
    //   specifications: this.myForm.value.specifications,
    //   bhThang: this.myForm.value.bhThang,
    //   supplierName: this.myForm.value.supplierName,
    //   amount: this.myForm.value.amount,
    //   cost: this.myForm.value.cost,
    //   typeAssets: this.myForm.value.typeAssets,
    //   nuocSanXuat: this.myForm.value.nuocSanXuat,
    //   condition: this.myForm.value.condition,
    // });
    // this.onLoadData(this.dataCreate);
  }

  // Quan hệ gia đình ========================================================
  listTbDataFamilyRelationship = {
    listColum: [
      { name: 'SỐ THỨ TỰ', cell: 'stt' },
      { name: 'HỌ TÊN', cell: 'name' },
      { name: 'NGÀY SINH', cell: 'birthday' },
      { name: 'GIỚI TÍNH', cell: 'gender' },
      { name: 'SỐ CMT', cell: 'cmt' },
      { name: 'NƠI Ở', cell: 'address' },
      { name: 'NƠI LÀM VIỆC', cell: 'work' },
      { name: 'QUAN HỆ', cell: 'relationship' },
      { name: 'GIẢM TRỪ', cell: 'reduce' },
      { name: 'THAO TÁC', cell: 'undefined' },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: 'Xóa', color: 'accent' }],
  };

  dataExampleFamilyRelationship = [
    {
      stt: 0,
      name: 'Nguyễn Văn A',
      birthday: '06/09/1969',
      gender: 'nam',
      cmt: '124132453',
      address: 'Bắc Ninh',
      work: 'Hà Nội',
      relationship: 'Bố',
      reduce: '',
    },
    {
      stt: 0,
      name: 'Đinh Thị B',
      birthday: '09/06/1971',
      gender: 'nữ',
      cmt: '122345433',
      address: 'Hà Nội',
      work: 'Hà Nội',
      relationship: 'Mẹ',
      reduce: '',
    },
    {
      stt: 0,
      name: 'Nguyễn Văn C',
      birthday: '06/09/1996',
      gender: 'nam',
      cmt: '124132422',
      address: 'Bắc Ninh',
      work: 'Bắc Ninh',
      relationship: 'Em trai',
      reduce: '',
    },
  ];

  onLoadDataFamilyRelationship() {
    this.mService.publishEvent(EVENT_PUSH.TABLE, {
      listData: this.dataExampleFamilyRelationship,
      listTbData: this.listTbDataFamilyRelationship,
    });
  }

  onClickAddFamilyRelationship() {
    const dialogRef = this.dialog.open(AddUpdateFamilyRelationshipComponent, {
      width: '900px',
      height: '700px',
    });
  }

  onClickEditFamilyRelationship(event) {
    const dialogRef = this.dialog.open(AddUpdateFamilyRelationshipComponent, {
      width: '900px',
      height: '700px',
      data: {
        name: event.data.name,
        // birthday: event.data.birthday,
        gender: event.data.gender,
        cmt: event.data.cmt,
        address: event.data.address,
        work: event.data.work,
        relationship: event.data.relationship,
        reduce: event.data.reduce,
      },
    });
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

  // Quản lý tình trạng nhân viên ===========================================

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
      { name: 'LÝ DO', cell: 'description' },
    ],
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

  // Quyết định tăng lương =======================================================

  listTbDataSalaryIncrease = {
    listColum: [
      { name: 'SỐ THỨ TỰ', cell: 'stt' },
      { name: 'SỐ QUYẾT ĐỊNH', cell: 'decisionCode' },
      { name: 'NGÀY KÝ', cell: 'decisionDate' },
      { name: 'MỨC LƯƠNG', cell: 'salaryIncrease' },
      { name: 'TÌNH TRẠNG QUYẾT ĐỊNH', cell: 'decisionStatus' },
      { name: 'NGÀY DỪNG', cell: 'stopEnd' },
      { name: 'LÝ DO', cell: 'description' },
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

  onClickEditSalaryIncrease(event) {
    const dialogRef = this.dialog.open(
      AddUpdateDecidedIncreaseSalariesComponent,
      {
        width: '900px',
        data: {
          decisionCode: event.data.decisionCode,
          salaryIncrease: event.data.salaryIncrease,
          status: event.data.status,
        },
      }
    );
  }
}
