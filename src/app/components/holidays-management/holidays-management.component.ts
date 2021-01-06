import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddUpdateHolidaysComponent } from 'src/app/dialogs/add-update-holidays/add-update-holidays.component';
import { RemoveComponent } from 'src/app/dialogs/remove/remove.component';
import { AppModuleService } from 'src/app/services/app-module.service';
import {
  BUTTON_TYPE,
  EVENT_PUSH,
  STATUS,
} from 'src/app/services/constant/app-constant';
import { ParamsKey } from 'src/app/services/constant/paramskey';

@Component({
  selector: 'app-holidays-management',
  templateUrl: './holidays-management.component.html',
  styleUrls: ['./holidays-management.component.less'],
})
export class HolidaysManagementComponent implements OnInit {
  listTbData = {
    listColum: [
      { name: 'SỐ THỨ TỰ', cell: 'stt' },
      { name: 'TỪ NGÀY', cell: 'dateStartHoliday' },
      { name: 'ĐẾN NGÀY', cell: 'dateEndHoliday' },
      { name: 'LOẠI NGHỈ LỄ', cell: 'nameLoaiChamCong' },
      { name: 'THAO TÁC', cell: 'undefined' },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: 'Xóa', color: 'accent' }],
  };

  collectionSize;
  page: number = 1;

  listFields = [{ name: 'LOẠI NGHỈ LỄ' }];

  dataSearch: any = {
    search: '',
    items: [{ conditionFields: '', fields: '', searchFields: '' }],
  };

  type = 'holiday';

  constructor(
    public mService: AppModuleService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.mService.LoadAppConfig(6);
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
      .sendRequestGET_LIST_TBL_NGHILE(page, JSON.stringify(dataSearch))
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
            .sendRequestDELETE_TBL_NGHILE(event.data)
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
    const dialogRef = this.dialog.open(AddUpdateHolidaysComponent, {
      width: '900px',
      data: {
        idLoaiChamCong: event.data.idLoaiChamCong,
        dateStartHoliday: event.data.dateStartHoliday,
        dateEndHoliday: event.data.dateEndHoliday,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        res.value.idLoaiChamCong = res.value.idLoaiChamCong.id;
        res.value.id = event.data.id;
        console.log(res.value);

        this.mService
          .getApiService()
          .sendRequestUPDATE_TBL_NGHILE(res.value)
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
    const dialogRef = this.dialog.open(AddUpdateHolidaysComponent, {
      width: '900px',
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        res.value.idLoaiChamCong = res.value.idLoaiChamCong.id;
        console.log(res.value);

        this.mService
          .getApiService()
          .sendRequestADD_TBL_NGHILE(res.value)
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
