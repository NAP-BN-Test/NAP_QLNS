import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { AddUpdateDecidedIncreaseSalariesComponent } from 'src/app/dialogs/add-update-decided-increase-salaries/add-update-decided-increase-salaries.component';
import { RemoveComponent } from 'src/app/dialogs/remove/remove.component';
import { AppModuleService } from 'src/app/services/app-module.service';
import {
  BUTTON_TYPE,
  EVENT_PUSH,
  STATUS,
} from 'src/app/services/constant/app-constant';
import { ParamsKey } from 'src/app/services/constant/paramskey';

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
      .sendRequestGET_LIST_TBL_QUYETDINH_TANGLUONG(
        page,
        JSON.stringify(dataSearch)
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
            .sendRequestDELETE_TBL_QUYETDINH_TANGLUONG(event.data)
            .then((data) => {
              this.mService.showSnackBar(data.message);
              if (data.status == STATUS.SUCCESS) {
                this.onLoadData(this.page, this.dataSearch);
              }
            });
        }
      });
    }
  }

  onClickEdit(event) {
    const dialogRef = this.dialog.open(
      AddUpdateDecidedIncreaseSalariesComponent,
      {
        width: '900px',
        data: {
          idNhanVien: event.data.idNhanVien,
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
        res.value['id'] = event.data.id;

        console.log(res.value);

        this.mService
          .getApiService()
          .sendRequestUPDATE_TBL_QUYETDINH_TANGLUONG(res.value)
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
    const dialogRef = this.dialog.open(
      AddUpdateDecidedIncreaseSalariesComponent,
      {
        width: '900px',
      }
    );

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        res.value['idNhanVien'] = res.value.idNhanVien.id;
        console.log(res.value);

        this.mService
          .getApiService()
          .sendRequestADD_TBL_QUYETDINH_TANGLUONG(res.value)
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
