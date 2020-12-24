import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddUpdateStaffComponent } from 'src/app/dialogs/add-update-staff/add-update-staff.component';
import { AppModuleService } from 'src/app/services/app-module.service';
import {
  BUTTON_TYPE,
  CLICK_DETAIL,
  EVENT_PUSH,
  STATUS,
} from 'src/app/services/constant/app-constant';
import { ParamsKey } from 'src/app/services/constant/paramskey';

@Component({
  selector: 'app-quote-management',
  templateUrl: './quote-management.component.html',
  styleUrls: ['./quote-management.component.less'],
})
export class QuoteManagementComponent implements OnInit {
  listTbData = {
    clickDetail: CLICK_DETAIL.STAFF,
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

  constructor(
    public mService: AppModuleService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mService.LoadAppConfig();
    if (this.mService.getUser()) {
      let params: any = this.mService.handleActivatedRoute();
      this.page = params.page ? params.page : 1;
      this.onLoadData(this.page, this.dataSearch);
    } else {
      this.mService.publishPageRoute('login');
    }
  }

  async onLoadData(page, dataSearch) {
    this.spinner.show();
    await this.mService
      .getApiService()
      .sendRequestGET_LIST_TBL_DMNHANVIEN(page, JSON.stringify(dataSearch))
      .then((data) => {
        console.log(data);

        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          this.collectionSize = data.all;
          this.mService.publishEvent(EVENT_PUSH.TABLE, {
            page: this.page,
            collectionSize: this.collectionSize,
            listData: data.array,
            listTbData: this.listTbData,
          });
        }
      });
    this.spinner.hide();
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

  onClickCell(event) {
    console.log(event);

    this.router.navigate(['menu/detail-staff'], {
      queryParams: { quoteID: 1, staffName: event.data.staffName },
    });
  }
}
