import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddUpdateDecidedIncreaseSalariesComponent } from 'src/app/dialogs/add-update-decided-increase-salaries/add-update-decided-increase-salaries.component';
import { AppModuleService } from 'src/app/services/app-module.service';
import {
  BUTTON_TYPE,
  EVENT_PUSH,
} from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-decided-to-increase-the-salaries',
  templateUrl: './decided-to-increase-the-salaries.component.html',
  styleUrls: ['./decided-to-increase-the-salaries.component.less'],
})
export class DecidedToIncreaseTheSalariesComponent implements OnInit {
  listTbData = {
    listColum: [
      { name: 'SỐ THỨ TỰ', cell: 'stt' },
      { name: 'SỐ QUYẾT ĐỊNH', cell: 'decisionCode' },
      { name: 'NGÀY KÝ', cell: 'decisionDate' },
      { name: 'MỨC LƯƠNG', cell: 'salaryIncrease' },
      { name: 'TÌNH TRẠNG QUYẾT ĐỊNH', cell: 'status' },
      { name: 'NGÀY DỪNG', cell: 'stopDate' },
      { name: 'LÝ DO', cell: 'stopReason' },
      { name: 'THAO TÁC', cell: 'undefined' },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: 'Xóa', color: 'accent' }],
  };

  collectionSize;
  page: number = 1;

  listFields = [{ name: 'TÊN LOẠI' }, { name: 'MÔ TẢ' }];

  dataSearch: any = {
    search: '',
    items: [{ conditionFields: '', fields: '', searchFields: '' }],
  };

  dataExample = [
    {
      stt: 0,
      decisionCode: 'QD0001',
      decisionDate: '11/12/2020',
      salaryIncrease: '6900000',
      status: 'Đang phê duyệt',
      stopDate: '01/01/2021',
      stopReason: '',
    },
    {
      stt: 1,

      decisionCode: 'QD0001',
      decisionDate: '12/11/2020',
      salaryIncrease: '6300000',
      status: 'Đang phê duyệt',
      stopDate: '01/01/2021',
      stopReason: '',
    },
    {
      stt: 2,
      decisionCode: 'QD0001',
      decisionDate: '30/11/2020',
      salaryIncrease: '6000000',
      status: 'Đang phê duyệt',
      stopDate: '01/01/2021',
      stopReason: '',
    },
  ];

  constructor(
    public mService: AppModuleService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
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

  onClickBtn(event) {
    // if (event.btnType == BUTTON_TYPE.DELETE) {
    //   const dialogRef = this.dialog.open(DialogRemoveComponent, {
    //     width: '500px',
    //   });
    //   dialogRef.afterClosed().subscribe((res) => {
    //     if (res) {
    //       this.mService
    //         .getApiService()
    //         .sendRequestDELETE_LABOR_MANAGEMENT_BOOK(event.data)
    //         .then((data) => {
    //           if (data.status == STATUS.SUCCESS) {
    //             this.onLoadData(1, this.dataSearch);
    //           }
    //         });
    //     }
    //   });
    // }
  }

  onClickEdit(event) {
    const dialogRef = this.dialog.open(
      AddUpdateDecidedIncreaseSalariesComponent,
      {
        width: '900px',
        data: {
          decisionCode: event.data.decisionCode,
          decisionDate: event.data.decisionDate,
          salaryIncrease: event.data.salaryIncrease,
          status: event.data.status,
          stopDate: event.data.stopDate,
          stopReason: event.data.stopReason,
        },
      }
    );

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

  onClickAdd() {
    const dialogRef = this.dialog.open(
      AddUpdateDecidedIncreaseSalariesComponent,
      {
        width: '900px',
      }
    );

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

  onClickSort(event) {
    this.dataSearch = event;
    this.onLoadData(1, event);
  }
  onClickPagination(event) {
    this.page = event;
    this.onLoadData(event, this.dataSearch);
  }
}
