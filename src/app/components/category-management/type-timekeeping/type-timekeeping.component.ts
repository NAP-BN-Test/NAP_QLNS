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
      { name: 'TÊN ĐẦY ĐỦ', cell: 'staffName' },
      { name: 'TÊN ĐĂNG NHẬP', cell: 'userName' },
      { name: 'MÃ NHÂN VIÊN', cell: 'staffCode' },
      { name: 'TRẠNG THÁI', cell: 'active' },
      { name: 'QUYỀN THỰC HIỆN', cell: 'permissionName' },
      { name: 'THAO TÁC', cell: 'undefined' },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: 'Xóa', color: 'accent' }],
  };

  collectionSize;
  page: number = 1;

  listFields = [
    { name: 'TÊN ĐẦY ĐỦ' },
    { name: 'TÊN ĐĂNG NHẬP' },
    { name: 'MÃ NHÂN VIÊN' },
    { name: 'TRẠNG THÁI' },
    { name: 'QUYỀN THỰC HIỆN' },
  ];

  dataSearch: any = {
    search: '',
    items: [{ conditionFields: '', fields: '', searchFields: '' }],
  };

  dataExample = [
    {
      stt: 0,
      staffName: 'Nguyễn Văn A',
      userName: 'user01',
      staffCode: 'NV0001',
      active: true,
      permissionName: 'Nhân viên',
    },
    {
      stt: 1,
      staffName: 'Nguyễn Văn B',
      userName: 'user02',
      staffCode: 'NV0002',
      active: true,
      permissionName: 'Nhân viên',
    },
    {
      stt: 2,
      staffName: 'Nguyễn Văn C',
      userName: 'user03',
      staffCode: 'NV0003',
      active: true,
      permissionName: 'Quản lý',
    },
  ];

  constructor(
    public mService: AppModuleService,
    public dialog: MatDialog
  ) // private spinner: NgxSpinnerService
  {}

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
        username: event.data.username,
        password: event.data.password,
        staffCode: event.data.staffCode,
        staffName: event.data.staffName,
        active: event.data.active,
        permission: event.data.permissionName,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let obj = {
          username: res.username,
          password: res.password,
          staffCode: res.staffCode,
          staffName: res.staffName,
          active: res.active,
          idPermission: res.idPermission,
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
          username: res.username,
          password: res.password,
          staffCode: res.staffCode,
          staffName: res.staffName,
          active: res.active,
          idPermission: res.idPermission,
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
