import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
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
      this.onLoadDataTrainingAfter();
    } else if (tabChangeEvent.index === 2) {
      this.onLoadDataTrainingBefore();
    } else if (tabChangeEvent.index === 3) {
      // this.onLoadDataMailmerge(this.addressBookID);
    } else if (tabChangeEvent.index === 4) {
      // this.onLoadDataHistory(1, this.addressBookID);
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
}
