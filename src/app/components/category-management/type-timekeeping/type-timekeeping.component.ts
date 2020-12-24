import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddUpdateTypeTimekeepingComponent } from 'src/app/dialogs/add-update-type-timekeeping/add-update-type-timekeeping.component';
import { RemoveComponent } from 'src/app/dialogs/remove/remove.component';
import { AppModuleService } from 'src/app/services/app-module.service';
import {
  BUTTON_TYPE,
  EVENT_PUSH,
  STATUS,
} from 'src/app/services/constant/app-constant';
import { ParamsKey } from 'src/app/services/constant/paramskey';

@Component({
  selector: 'app-type-timekeeping',
  templateUrl: './type-timekeeping.component.html',
  styleUrls: ['./type-timekeeping.component.less'],
})
export class TypeTimekeepingComponent implements OnInit {
  listTbData = {
    listColum: [
      { name: 'SỐ THỨ TỰ', cell: 'stt' },
      { name: 'MÃ LOẠI', cell: 'code' },
      { name: 'TÊN LOẠI', cell: 'name' },
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

  type = 'timekeeping';

  constructor(
    public mService: AppModuleService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
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
      .sendRequestGET_LIST_TBL_LOAICHAMCONG(
        page,
        JSON.stringify(dataSearch),
        this.type
      )
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
            .sendRequestDELETE_TBL_LOAICHAMCONG(event.data)
            .then((data) => {
              this.mService.showSnackBar(data.message);
              if (data.status == STATUS.SUCCESS) {
                this.onLoadData(1, this.dataSearch);
              }
            });
        }
      });
    }
  }

  onClickEdit(event) {
    const dialogRef = this.dialog.open(AddUpdateTypeTimekeepingComponent, {
      width: '900px',
      data: {
        name: event.data.name,
        description: event.data.description,
        code: event.data.code,
        type: this.type,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let obj = {
          id: event.data.id,
          name: res.name,
          description: res.description,
          type: this.type,
          code: res.code,
        };
        this.mService
          .getApiService()
          .sendRequestUPDATE_TBL_LOAICHAMCONG(obj)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (data.status == STATUS.SUCCESS) {
              this.onLoadData(this.page, this.dataSearch);
            }
          });
      }
    });
  }

  onClickAdd() {
    const dialogRef = this.dialog.open(AddUpdateTypeTimekeepingComponent, {
      width: '900px',
      data: {
        type: this.type,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let obj = {
          name: res.name,
          description: res.description,
          code: res.code,
          type: this.type,
        };
        this.mService
          .getApiService()
          .sendRequestADD_TBL_LOAICHAMCONG(obj)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (data.status == STATUS.SUCCESS) {
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
