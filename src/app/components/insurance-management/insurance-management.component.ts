import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddUpdateInsuranceComponent } from 'src/app/dialogs/add-update-insurance/add-update-insurance.component';
import { AppModuleService } from 'src/app/services/app-module.service';
import {
  BUTTON_TYPE,
  EVENT_PUSH,
} from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-insurance-management',
  templateUrl: './insurance-management.component.html',
  styleUrls: ['./insurance-management.component.less'],
})
export class InsuranceManagementComponent implements OnInit {
  listTbData = {
    listColum: [
      { name: 'SỐ THỨ TỰ', cell: 'stt' },
      { name: 'MỨC ĐÓNG BHXH CTY', cell: 'companyBHXH' },
      { name: 'MỨC ĐÓNG BHYT CTY', cell: 'companyBHYT' },
      { name: 'MỨC ĐÓNG BHTN CTY', cell: 'companyBHTN' },
      { name: 'MỨC ĐÓNG BHXH NV', cell: 'staffBHXH' },
      { name: 'MỨC ĐÓNG BHYT NV', cell: 'staffBHYT' },
      { name: 'MỨC ĐÓNG BHTN NV', cell: 'staffBHTN' },
      { name: 'TỪ NGÀY', cell: 'dateStart' },
      { name: 'ĐẾN NGÀY', cell: 'dateEnd' },
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
      companyBHXH: 'JH312738912379',
      companyBHYT: 'GT348597348957',
      companyBHTN: 'JG1231231232132',
      staffBHXH: 'HF2323728732837',
      staffBHYT: 'GH378289732938',
      staffBHTN: 'JGO238129381290',
      dateStart: '01-11-2020',
      dateEnd: '01-11-2021',
    },
    {
      stt: 1,
      companyBHXH: 'JH312738912379',
      companyBHYT: 'GT348597348957',
      companyBHTN: 'JG1231231232132',
      staffBHXH: 'HF2323728732837',
      staffBHYT: 'GH378289732938',
      staffBHTN: 'JGO238129381290',
      dateStart: '01-11-2020',
      dateEnd: '01-11-2021',
    },
    {
      stt: 2,
      companyBHXH: 'JH312738912379',
      companyBHYT: 'GT348597348957',
      companyBHTN: 'JG1231231232132',
      staffBHXH: 'HF2323728732837',
      staffBHYT: 'GH378289732938',
      staffBHTN: 'JGO238129381290',
      dateStart: '01-11-2020',
      dateEnd: '01-11-2021',
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
    const dialogRef = this.dialog.open(AddUpdateInsuranceComponent, {
      width: '900px',
      data: {
        companyBHXH: event.data.companyBHXH,
        companyBHYT: event.data.companyBHYT,
        companyBHTN: event.data.companyBHTN,
        staffBHXH: event.data.staffBHXH,
        staffBHYT: event.data.staffBHYT,
        staffBHTN: event.data.staffBHTN,
        // dateStart: event.data.dateStart,
        // dateEnd: event.data.dateEnd,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let obj = {
          companyBHXH: res.companyBHXH,
          companyBHYT: res.companyBHYT,
          companyBHTN: res.companyBHTN,
          staffBHXH: res.staffBHXH,
          staffBHYT: res.staffBHYT,
          staffBHTN: res.staffBHTN,
          dateStart: res.dateStart,
          dateEnd: res.dateEnd,
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
    const dialogRef = this.dialog.open(AddUpdateInsuranceComponent, {
      width: '900px',
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let obj = {
          companyBHXH: res.companyBHXH,
          companyBHYT: res.companyBHYT,
          companyBHTN: res.companyBHTN,
          staffBHXH: res.staffBHXH,
          staffBHYT: res.staffBHYT,
          staffBHTN: res.staffBHTN,
          dateStart: res.dateStart,
          dateEnd: res.dateEnd,
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
