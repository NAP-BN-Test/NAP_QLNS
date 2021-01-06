import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { RemoveComponent } from 'src/app/dialogs/remove/remove.component';
import { AppModuleService } from 'src/app/services/app-module.service';
import {
  BUTTON_TYPE,
  EVENT_PUSH,
  STATUS,
} from 'src/app/services/constant/app-constant';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { AddUpdateTakeLeaveComponent } from 'src/app/dialogs/add-update-take-leave/add-update-take-leave/add-update-take-leave.component';

@Component({
  selector: 'app-take-leave-management',
  templateUrl: './take-leave-management.component.html',
  styleUrls: ['./take-leave-management.component.less'],
})
export class TakeLeaveManagementComponent implements OnInit {
  listTbData = {
    listColum: [
      { name: 'SỐ THỨ TỰ', cell: 'stt' },
      { name: 'TỪ NGÀY', cell: 'dateStart' },
      { name: 'ĐẾN NGÀY', cell: 'dateEnd' },
      { name: 'LOẠI CHẤM CÔNG', cell: 'nameLoaiChamCong' },
      { name: 'NHÂN VIÊN', cell: 'staffName' },
      { name: 'THAO TÁC', cell: 'undefined' },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: 'Xóa', color: 'accent' }],
  };

  collectionSize;
  page: number = 1;

  listFields = [{ name: 'LOẠI CHẤM CÔNG' }, { name: 'NHÂN VIÊN' }];

  dataSearch: any = {
    search: '',
    items: [{ conditionFields: '', fields: '', searchFields: '' }],
  };

  constructor(
    public mService: AppModuleService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.mService.LoadAppConfig(9);
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
      .sendRequestGET_LIST_TBL_NGHIPHEP(page, JSON.stringify(dataSearch))
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

  onClickBtn(event) {
    if (event.btnType == BUTTON_TYPE.DELETE) {
      const dialogRef = this.dialog.open(RemoveComponent, {
        width: '500px',
      });
      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          this.mService
            .getApiService()
            .sendRequestDELETE_TBL_NGHIPHEP(event.data)
            .then((data) => {
              if (data.status == STATUS.SUCCESS) {
                this.onLoadData(1, this.dataSearch);
              }
            });
        }
      });
    }
  }

  onClickEdit(event) {
    const dialogRef = this.dialog.open(AddUpdateTakeLeaveComponent, {
      width: '900px',
      data: {
        idLoaiChamCong: event.data.idLoaiChamCong,
        dateStart: event.data.dateStart,
        dateEnd: event.data.dateEnd,
        idNhanVien: event.data.idNhanVien,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        res.value.id = event.data.id;
        console.log(res.value);
        this.mService
          .getApiService()
          .sendRequestUPDATE_TBL_NGHIPHEP(res.value)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
              this.onLoadData(this.page, this.dataSearch);
            }
          });
      }
    });
  }

  onClickAdd() {
    const dialogRef = this.dialog.open(AddUpdateTakeLeaveComponent, {
      width: '900px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log(res.value);
        this.mService
          .getApiService()
          .sendRequestADD_TBL_NGHIPHEP(res.value)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
              this.onLoadData(this.page, this.dataSearch);
            }
          });
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
