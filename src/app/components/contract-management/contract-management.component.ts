import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddUpdateContractComponent } from 'src/app/dialogs/add-update-contract/add-update-contract.component';
import { RemoveComponent } from 'src/app/dialogs/remove/remove.component';
import { AppModuleService } from 'src/app/services/app-module.service';
import {
  BUTTON_TYPE,
  EVENT_PUSH,
  STATUS,
} from 'src/app/services/constant/app-constant';
import { ParamsKey } from 'src/app/services/constant/paramskey';

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
      { name: 'NGÀY KÝ', cell: 'signDate' },
      { name: 'LOẠI HỢP ĐỒNG', cell: 'loaiHopDong' },
      { name: 'MỨC LƯƠNG', cell: 'salaryNumber' },
      { name: 'TÌNH TRẠNG HỢP ĐỒNG', cell: 'status' },
      { name: 'NGÀY CHẤM DỨT', cell: 'contractDateEnd' },
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
      .sendRequestGET_LIST_TBL_HOPDONG_NHANSU(page, JSON.stringify(dataSearch))
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
            .sendRequestDELETE_TBL_HOPDONG_NHANSU(event.data)
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
    console.log(event);
    
    const dialogRef = this.dialog.open(AddUpdateContractComponent, {
      width: '900px',
      data: {
        idNhanVien: event.data.idNhanVien,
        contractCode: event.data.contractCode,
        idLoaiHopDong: event.data.idLoaiHopDong,
        signDate: event.data.signDate,
        salaryNumber: event.data.salaryNumber,
        contractDateEnd: event.data.contractDateEnd,
        status: event.data.status,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        res.value['id'] = event.data.id;
        console.log(res.value);

        this.mService
          .getApiService()
          .sendRequestUPDATE_TBL_HOPDONG_NHANSU(res.value)
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
    const dialogRef = this.dialog.open(AddUpdateContractComponent, {
      width: '900px',
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log(res.value);

        this.mService
          .getApiService()
          .sendRequestADD_TBL_HOPDONG_NHANSU(res.value)
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
