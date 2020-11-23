import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddUpdateContractComponent } from 'src/app/dialogs/add-update-contract/add-update-contract.component';
import { AppModuleService } from 'src/app/services/app-module.service';
import {
  BUTTON_TYPE,
  EVENT_PUSH,
} from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-contract-management',
  templateUrl: './contract-management.component.html',
  styleUrls: ['./contract-management.component.less'],
})
export class ContractManagementComponent implements OnInit {
  listTbData = {
    listColum: [
      { name: 'SỐ THỨ TỰ', cell: 'stt' },
      { name: 'SỐ HỢP ĐỒNG', cell: 'contractCode' },
      { name: 'NGÀY KÝ', cell: 'contractDateStart' },
      { name: 'LOẠI HỢP ĐỒNG', cell: 'contractType' },
      { name: 'MỨC LƯƠNG', cell: 'salaryNumber' },
      { name: 'TÌNH TRẠNG HỢP ĐỒNG', cell: 'status' },
      { name: 'NGÀY CHẤM DỨT', cell: 'contractDateEnd' },
      { name: 'LÝ DO', cell: 'reason' },
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
      contractCode: 'QD0001',
      contractType: 'Loại hợp đồng A',
      contractDateStart: '11/12/2020',
      salaryNumber: '6900000',
      status: 'Đang phê duyệt',
      contractDateEnd: '01/01/2021',
      reason: '',
    },
    {
      stt: 1,

      contractCode: 'QD0001',
      contractType: 'Loại hợp đồng B',
      contractDateStart: '12/11/2020',
      salaryNumber: '6300000',
      status: 'Đang phê duyệt',
      contractDateEnd: '01/01/2021',
      reason: '',
    },
    {
      stt: 2,
      contractCode: 'QD0001',
      contractType: 'Loại hợp đồng C',
      contractDateStart: '30/11/2020',
      salaryNumber: '6000000',
      status: 'Đang phê duyệt',
      contractDateEnd: '01/01/2021',
      reason: '',
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
    const dialogRef = this.dialog.open(AddUpdateContractComponent, {
      width: '900px',
      data: {
        contractCode: event.data.contractCode,
        contractType: event.data.contractType,
        // contractDateStart: event.data.contractDateStart,
        salaryNumber: event.data.salaryNumber,
        // contractDateEnd: event.data.contractDateEnd,
        reason: event.data.reason,
        status: event.data.status,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let obj = {
          contractCode: res.contractCode,
          contractType: res.contractType,
          contractDateStart: res.contractDateStart,
          salaryNumber: res.salaryNumber,
          contractDateEnd: res.contractDateEnd,
          reason: res.reason,
          status: res.status,
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
    const dialogRef = this.dialog.open(AddUpdateContractComponent, {
      width: '900px',
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let obj = {
          contractCode: res.contractCode,
          contractType: res.contractType,
          contractDateStart: res.contractDateStart,
          salaryNumber: res.salaryNumber,
          contractDateEnd: res.contractDateEnd,
          reason: res.reason,
          status: res.status,
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
