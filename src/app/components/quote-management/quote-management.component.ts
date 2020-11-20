import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddUpdateStaffComponent } from 'src/app/dialogs/add-update-staff/add-update-staff.component';
import { AppModuleService } from 'src/app/services/app-module.service';
import {
  BUTTON_TYPE,
  EVENT_PUSH,
} from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-quote-management',
  templateUrl: './quote-management.component.html',
  styleUrls: ['./quote-management.component.less'],
})
export class QuoteManagementComponent implements OnInit {
  listTbData = {
    listColum: [
      { name: 'SỐ THỨ TỰ', cell: 'stt' },
      { name: 'MÃ NHÂN VIÊN', cell: 'staffCode' },
      { name: 'TÊN NHÂN VIÊN', cell: 'staffName' },
      { name: 'GIỚI TÍNH', cell: 'gender' },
      { name: 'NGÀY SINH', cell: 'birthday' },
      { name: 'SỐ CMND', cell: 'cmndNumber' },
      { name: 'ĐỊA CHỈ', cell: 'address' },
      { name: 'SỐ ĐIỆN THOẠI', cell: 'phoneNumber' },
      { name: 'EMAIL', cell: 'email' },
      { name: 'PHÒNG BAN/BỘ PHẬN', cell: 'departmentName' },
      { name: 'CHI NHÁNH', cell: 'branchName' },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: 'Xóa', color: 'accent' }],
  };

  collectionSize;
  page: number = 1;

  listFields = [
    { name: 'MÃ NHÂN VIÊN' },
    { name: 'TÊN NHÂN VIÊN' },
    { name: 'GIỚI TÍNH' },
    { name: 'NGÀY SINH' },
    { name: 'SỐ CMND' },
    { name: 'ĐỊA CHỈ' },
    { name: 'SỐ ĐIỆN THOẠI' },
    { name: 'EMAIL' },
    { name: 'PHÒNG BAN/BỘ PHẬN' },
    { name: 'CHI NHÁNH' },
  ];

  dataSearch: any = {
    search: '',
    items: [{ conditionFields: '', fields: '', searchFields: '' }],
  };

  dataExample = [
    {
      stt: 0,
      staffName: 'Nhân viên A',
      staffCode: 'NV90924',
      taxCode: '12198274',
      describe: 'Nhân viên tốt',
      address: 'Bắc Ninh',
      gender: 'Nam',
      phoneNumber: '0912349999',
      cmndNumber: '12379828748',
      birthday: '12-07-1995',
      email: 'nhanviena@gmai.com',
      departmentName: 'Bộ phận A',
      branchName: 'Chi nhánh A',
    },
    {
      stt: 1,
      staffName: 'Nhân viên B',
      staffCode: 'NV90925',
      taxCode: '12198275',
      describe: 'Nhân viên tốt',
      address: 'Bắc Ninh',
      gender: 'Nam',
      phoneNumber: '0912349998',
      cmndNumber: '12379832546',
      birthday: '15-06-1996',
      email: 'nhanvienb@gmai.com',
      departmentName: 'Bộ phận B',
      branchName: 'Chi nhánh B',
    },
    {
      stt: 2,
      staffName: 'Nhân viên C',
      staffCode: 'NV90926',
      taxCode: '12198276',
      describe: 'Nhân viên tốt',
      address: 'Bắc Ninh',
      gender: 'Nữ',
      phoneNumber: '0912349997',
      cmndNumber: '12379828435',
      birthday: '19-06-1985',
      email: 'nhanvienc@gmai.com',
      departmentName: 'Bộ phận C',
      branchName: 'Chi nhánh C',
    },
  ];

  constructor(
    public mService: AppModuleService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // this.mService.LoadAppConfig();
    // if (this.mService.getUser()) {
    //   let params: any = this.mService.handleActivatedRoute();
    //   this.page = params.page ? params.page : 1;
    this.onLoadData(this.page, this.dataSearch);
    // } else {
    //   this.mService.publishPageRoute('login');
    // }
  }

  async onLoadData(page, dataSearch) {
    // this.spinner.show();
    // await this.mService
    //   .getApiService()
    //   .sendRequestGET_LIST_LABOR_MANAGEMENT_BOOK(
    //     page,
    //     JSON.stringify(dataSearch)
    //   )
    //   .then((data) => {
    //     if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
    this.collectionSize = 3;
    this.mService.publishEvent(EVENT_PUSH.TABLE, {
      page: this.page,
      collectionSize: this.collectionSize,
      listData: this.dataExample,
      listTbData: this.listTbData,
    });
    //     }
    //   });
    // this.spinner.hide();
  }

  onClickSort(event) {
    this.dataSearch = event;
    this.onLoadData(1, event);
  }
  onClickPagination(event) {
    this.page = event;
    this.onLoadData(event, this.dataSearch);
  }

  onClickAdd() {
    const dialogRef = this.dialog.open(AddUpdateStaffComponent, {
      width: '900px',
      height: '700px',

    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let obj = {
          decisionCode: res.decisionCode,
          decisionDate: res.decisionDate,
          salaryIncrease: res.salaryIncrease,
          status: res.status,
          stopDate: res.stopDate,
          stopReason: res.stopReason,
        };
        // this.mService
        //   .getApiService()
        //   .sendRequestADD_LABOR_MANAGEMENT_BOOK(obj)
        //   .then((data) => {
        //     this.mService.showSnackBar(data.message);
        //     if (data.status == STATUS.SUCCESS) {
        //       this.onLoadData(this.page, this.dataSearch);
        //     }
        //   });
      }
    });
  }
}
