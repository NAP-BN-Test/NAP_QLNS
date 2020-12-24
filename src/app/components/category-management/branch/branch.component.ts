import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddUpdateBranchComponent } from 'src/app/dialogs/add-update-branch/add-update-branch.component';
import { RemoveComponent } from 'src/app/dialogs/remove/remove.component';
import { AppModuleService } from 'src/app/services/app-module.service';
import {
  BUTTON_TYPE,
  EVENT_PUSH,
  STATUS,
} from 'src/app/services/constant/app-constant';
import { ParamsKey } from 'src/app/services/constant/paramskey';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.less'],
})
export class BranchComponent implements OnInit {
  listTbData = {
    listColum: [
      { name: 'SỐ THỨ TỰ', cell: 'stt' },
      { name: 'MÃ CHI NHÁNH', cell: 'branchCode' },
      { name: 'TÊN CHI NHÁNH', cell: 'branchName' },
      { name: 'ĐỊA CHỈ', cell: 'address' },
      { name: 'SỐ ĐIỆN THOẠI', cell: 'phoneNumber' },
      { name: 'FAX', cell: 'faxNumber' },
      { name: 'EMAIL', cell: 'email' },
      { name: 'THAO TÁC', cell: 'undefined' },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: 'Xóa', color: 'accent' }],
  };

  collectionSize;
  page: number = 1;

  listFields = [
    { name: 'MÃ CHI NHÁNH' },
    { name: 'TÊN CHI NHÁNH' },
    { name: 'ĐỊA CHỈ' },
    { name: 'SỐ ĐIỆN THOẠI' },
    { name: 'FAX' },
    { name: 'EMAIL' },
  ];

  dataSearch: any = {
    search: '',
    items: [{ conditionFields: '', fields: '', searchFields: '' }],
  };

  constructor(
    public mService: AppModuleService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
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
      .sendRequestGET_LIST_TBL_DM_CHINHANH(page, JSON.stringify(dataSearch))
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

  onClickAdd() {
    const dialogRef = this.dialog.open(AddUpdateBranchComponent, {
      width: '900px',
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let obj = {
          branchName: res.branchName,
          branchCode: res.branchCode,
          address: res.address,
          phoneNumber: res.phoneNumber,
          faxNumber: res.faxNumber,
          email: res.email,
        };
        this.mService
          .getApiService()
          .sendRequestADD_TBL_DM_CHINHANH(obj)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (data.status == STATUS.SUCCESS) {
              this.onLoadData(this.page, this.dataSearch);
            }
          });
      }
    });
  }

  onClickEdit(event) {
    const dialogRef = this.dialog.open(AddUpdateBranchComponent, {
      width: '900px',
      data: {
        branchName: event.data.branchName,
        branchCode: event.data.branchCode,
        address: event.data.address,
        phoneNumber: event.data.phoneNumber,
        faxNumber: event.data.faxNumber,
        email: event.data.email,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let obj = {
          id: event.data.id,
          branchName: res.branchName,
          branchCode: res.branchCode,
          address: res.address,
          phoneNumber: res.phoneNumber,
          faxNumber: res.faxNumber,
          email: res.email,
        };
        this.mService
          .getApiService()
          .sendRequestUPDATE_TBL_DM_CHINHANH(obj)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (data.status == STATUS.SUCCESS) {
              this.onLoadData(this.page, this.dataSearch);
            }
          });
      }
    });
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
            .sendRequestDELETE_TBL_DM_CHINHANH(event.data)
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

  onClickSort(event) {
    this.dataSearch = event;
    this.onLoadData(1, event);
  }
  onClickPagination(event) {
    this.page = event;
    this.onLoadData(event, this.dataSearch);
  }
}
