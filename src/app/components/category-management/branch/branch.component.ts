import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddUpdateBranchComponent } from 'src/app/dialogs/add-update-branch/add-update-branch.component';
import { AppModuleService } from 'src/app/services/app-module.service';
import {
  BUTTON_TYPE,
  EVENT_PUSH,
} from 'src/app/services/constant/app-constant';

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

  dataExample = [
    {
      stt: 0,
      branchName: 'Chi nhánh A',
      branchCode: 'B198274',
      address: 'Bắc Ninh - Việt Nam',
      phoneNumber: '0912349999',
      faxNumber: '124398350857',
      email: 'chinhanha@gmai.com',
    },
    {
      stt: 1,
      branchName: 'Chi nhánh B',
      branchCode: 'B198275',
      address: 'Bắc Ninh - Việt Nam',
      phoneNumber: '0912349998',
      faxNumber: '124398350858',
      email: 'chinhanhb@gmai.com',
    },
    {
      stt: 2,
      branchName: 'Chi nhánh C',
      branchCode: 'B198276',
      address: 'Bắc Ninh - Việt Nam',
      phoneNumber: '0912349997',
      faxNumber: '124398350859',
      email: 'chinhanhc@gmai.com',
    },
  ];

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

  onClickAdd() {
    const dialogRef = this.dialog.open(AddUpdateBranchComponent, {
      width: '900px',
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
