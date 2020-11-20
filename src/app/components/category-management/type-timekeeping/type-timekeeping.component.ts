import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateTypeTimekeepingComponent } from 'src/app/dialogs/add-update-type-timekeeping/add-update-type-timekeeping.component';
import { AppModuleService } from 'src/app/services/app-module.service';
import {
  BUTTON_TYPE,
  EVENT_PUSH,
} from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-type-timekeeping',
  templateUrl: './type-timekeeping.component.html',
  styleUrls: ['./type-timekeeping.component.less'],
})
export class TypeTimekeepingComponent implements OnInit {
  listTbData = {
    listColum: [
      { name: 'SỐ THỨ TỰ', cell: 'stt' },
      { name: 'MÃ LOẠI', cell: 'typeCode' },
      { name: 'TÊN LOẠI', cell: 'nameType' },
      { name: 'MÔ TẢ', cell: 'description' },
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
      nameType: 'Làm việc',
      description: 'Đủ 8 tiếng',
      typeCode: 'LV',
    },
    {
      stt: 1,
      nameType: 'Nghỉ luân phiên',
      description: 't7,cn',
      typeCode: 'LP',
    },
    {
      stt: 2,
      nameType: 'Nghỉ phép',
      description: 'nghỉ ngày LV',
      typeCode: 'F',
    },
  ];

  constructor(
    public mService: AppModuleService,
    public dialog: MatDialog // private spinner: NgxSpinnerService
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
    const dialogRef = this.dialog.open(AddUpdateTypeTimekeepingComponent, {
      width: '900px',
      data: {
        nameType: event.data.nameType,
        description: event.data.description,
        typeCode: event.data.typeCode,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let obj = {
          nameType: res.nameType,
          description: res.description,
          typeCode: res.typeCode,
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
    const dialogRef = this.dialog.open(AddUpdateTypeTimekeepingComponent, {
      width: '900px',
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let obj = {
          nameType: res.nameType,
          description: res.description,
          typeCode: res.typeCode,
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
