import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddUpdateInsuranceComponent } from 'src/app/dialogs/add-update-insurance/add-update-insurance.component';
import { RemoveComponent } from 'src/app/dialogs/remove/remove.component';
import { AppModuleService } from 'src/app/services/app-module.service';
import {
  BUTTON_TYPE,
  EVENT_PUSH,
  STATUS,
} from 'src/app/services/constant/app-constant';
import { ParamsKey } from 'src/app/services/constant/paramskey';

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

  listFields = [];

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
    this.mService.LoadAppConfig(3);
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
      .sendRequestGET_LIST_TBL_MUCDONG_BAOHIEM(page, JSON.stringify(dataSearch))
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
            .sendRequestDELETE_TBL_MUCDONG_BAOHIEM(event.data)
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
    const dialogRef = this.dialog.open(AddUpdateInsuranceComponent, {
      width: '900px',
      data: {
        companyBHXH: event.data.companyBHXH,
        companyBHYT: event.data.companyBHYT,
        companyBHTN: event.data.companyBHTN,
        staffBHXH: event.data.staffBHXH,
        staffBHYT: event.data.staffBHYT,
        staffBHTN: event.data.staffBHTN,
        dateStart: event.data.dateStart,
        dateEnd: event.data.dateEnd,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        res.value['id'] = event.data.id;
        console.log(res.value);
        this.mService
          .getApiService()
          .sendRequestUPDATE_TBL_MUCDONG_BAOHIEM(res.value)
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
    const dialogRef = this.dialog.open(AddUpdateInsuranceComponent, {
      width: '900px',
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log(res.value);

        this.mService
          .getApiService()
          .sendRequestADD_TBL_MUCDONG_BAOHIEM(res.value)
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
